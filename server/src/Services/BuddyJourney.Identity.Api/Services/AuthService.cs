using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
using BuddyJourney.Core.Messages.Integration;
using BuddyJourney.Identity.Api.Interfaces;
using BuddyJourney.Identity.Api.Model;
using BuddyJourney.MessageBus;
using BuddyJourney.WebApi.Core.Identity;
using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BuddyJourney.Identity.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<MongoUser> _signInManager;
        private readonly UserManager<MongoUser> _userManager;
        private readonly IEmailSenderService _emailSenderService;
        private readonly AppSettings _appSettings;
        
        private readonly IMessageBus _bus;

        public AuthService(SignInManager<MongoUser> signInManager, UserManager<MongoUser> userManager,
            IOptions<AppSettings> appSettings, IEmailSenderService messageServices,
            IEmailSenderService emailSenderService, IMessageBus bus)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _emailSenderService = emailSenderService;
            _bus = bus;
            _appSettings = appSettings.Value;
        }

        public async Task<IdentityResult> RegisterUser(MongoUser user,
            UserRegister userRegister) =>
            await _userManager.CreateAsync(user,
                userRegister.Password);


        public async Task<SignInResult> LoginUser(UserLogin userLogin) =>
            await _signInManager.PasswordSignInAsync(userLogin.Email,
                userLogin.Password,
                false,
                true);

        public async Task<UserLoginResponse> GenerateJwt(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var claims = await _userManager.GetClaimsAsync(user);

            var identityClaims = await GetUserClaims(claims, user);
            var encodedToken = EncodeToken(identityClaims);

            return GetTokenResponse(encodedToken, user, claims);
        }

        public async Task<ClaimsIdentity> GetUserClaims(ICollection<Claim> claims, MongoUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, ToUnixEpochDate(DateTime.UtcNow).ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(DateTime.UtcNow).ToString(),
                ClaimValueTypes.Integer64));

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim("role", userRole));
            }

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaims(claims);

            return identityClaims;
        }

        public string EncodeToken(ClaimsIdentity identityClaims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.ValidOn,
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddHours(_appSettings.ExpirationHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            });

            return tokenHandler.WriteToken(token);
        }

        public UserLoginResponse GetTokenResponse(string encodedToken, MongoUser user, IEnumerable<Claim> claims)
        {
            var response = new UserLoginResponse
            {
                AccessToken = encodedToken,
                ExpiresIn = TimeSpan.FromHours(_appSettings.ExpirationHours).TotalSeconds,
                UserToken = new UserToken
                {
                    Id = user.Id.ToString(),
                    Email = user.Email,
                    Claims = claims.Select(c => new UserClaim() {Type = c.Type, Value = c.Value})
                }
            };

            return response;
        }

        public async Task<bool> SendEmailForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            var link = await _userManager.GeneratePasswordResetTokenAsync(user);
            var urlCode = WebUtility.UrlEncode(link);
            var urlEmail = WebUtility.UrlEncode(user.Email);
            var linkBuild = string.Concat(_appSettings.WebForgotPasswordRedirect, urlCode, "/", urlEmail);
            await _emailSenderService.SendEmailAsync(email, "Buddy Journey", linkBuild);

            return true;
        }

        public async Task<bool> RecoverPassword(string emailEncoded, string newPassword, string codeEncoded)
        {
            var email = WebUtility.UrlDecode(emailEncoded);
            var code = WebUtility.UrlDecode(codeEncoded);
            var user = await _userManager.FindByEmailAsync(email);
            var result = await _userManager.ResetPasswordAsync(user, code, newPassword);

            return result.Succeeded;
        }
        
        public async Task<ValidationResult> RegisterProfile(UserRegister userRegister)
        {
            var user = await _userManager.FindByEmailAsync(userRegister.Email);

            var userRegistered = new UserRegisterIntegrationEvent(user.Id.ToString(), userRegister.Name, user.Email);

            try
            {
                var result = await _bus.RequestAsync<UserRegisterIntegrationEvent, ResponseMessage>(userRegistered);

                if (result.ValidationResult.IsValid)
                {
                    return null;
                }

                return result.ValidationResult;
            }
            catch(Exception error)
            {
                await _userManager.DeleteAsync(user);
                throw;
            }
        }

        private static long ToUnixEpochDate(DateTime date)
            => (long) Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                .TotalSeconds);
    }
}