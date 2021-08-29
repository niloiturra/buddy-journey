using System;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;

namespace BuddyJourney.WebApi.Core.User
{
    public class AspNetUser: IAspNetUser
    {
        private readonly IHttpContextAccessor _accessor;

        public AspNetUser(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public string Name => _accessor.HttpContext?.User.Identity?.Name;

        public string GetUserId()
        {
            return IsAuthenticated() ? _accessor.HttpContext?.User.GetUserId() : string.Empty;
        }

        public string GetUserEmail()
        {
            return IsAuthenticated() ? _accessor.HttpContext?.User.GetUserEmail() : "";
        }

        public string GetUserToken()
        {
            return IsAuthenticated() ? _accessor.HttpContext?.User.GetUserToken() : "";
        }

        public bool IsAuthenticated()
        {
            return _accessor.HttpContext.User.Identity.IsAuthenticated;
        }

        public HttpContext GetHttpContext()
        {
            return _accessor.HttpContext;
        }
    }
}