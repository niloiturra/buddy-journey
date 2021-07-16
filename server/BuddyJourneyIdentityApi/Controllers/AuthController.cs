﻿using System.Threading.Tasks;
using AspNetCore.Identity.Mongo.Model;
using BuddyJourneyIdentityApi.Interfaces;
using BuddyJourneyIdentityApi.Model;
using BuddyJourneyIdentityApi.Model.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace BuddyJourneyIdentityApi.Controllers
{
    [Route("api/identity")]
    public class AuthController: BaseController
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(UserRegister userRegister)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var user = new MongoUser
            {
                UserName = userRegister.Email,
                Email = userRegister.Email,
                EmailConfirmed = true
            };

            var result = await _authService.RegisterUser(user, userRegister);

            if (result.Succeeded)
            {
                return CustomResponse(await _authService.GenerateJwt(userRegister.Email));
            }

            foreach (var error in result.Errors)
            {
                AddProcessingError(error.Description);
            }

            return CustomResponse(result);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLogin userLogin)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var result = await _authService.LoginUser(userLogin);

            if (result.Succeeded)
            {
                return CustomResponse(await _authService.GenerateJwt(userLogin.Email));
            }

            if (result.IsLockedOut)
            {
                AddProcessingError("Usuário Temporariamente bloqueado por tentativas inválidas");
                return CustomResponse();
            }

            AddProcessingError("Usuário ou senha incorretos");
            return CustomResponse();
        }
        
        [HttpPost("forgot-password")]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var result = await _authService.SendEmailForgotPassword(model.Email);

            if (result)
            {
                return CustomResponse();
            }
            
            AddProcessingError("Não foi encontrado um usuário com o email informado");
            return CustomResponse();
        }
    }
}