using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
using BuddyJourneyIdentityApi.Model;
using Microsoft.AspNetCore.Identity;

namespace BuddyJourneyIdentityApi.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterUser(MongoUser user, UserRegister userRegister);
        Task<SignInResult> LoginUser(UserLogin userLogin);
        Task<UserLoginResponse> GenerateJwt(string email);
        Task<ClaimsIdentity> GetUserClaims(ICollection<Claim> claims, MongoUser user);
        string EncodeToken(ClaimsIdentity identityClaims);
        UserLoginResponse GetTokenResponse(string encodedToken, MongoUser user, IEnumerable<Claim> claims);
        Task<bool> SendEmailForgotPassword(string email);
    }
}