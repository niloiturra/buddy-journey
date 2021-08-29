using System;
using Microsoft.AspNetCore.Http;

namespace BuddyJourney.WebApi.Core.User
{
    public interface IAspNetUser
    {
        string Name { get; }
        string GetUserId();
        string GetUserEmail();
        string GetUserToken();
        bool IsAuthenticated();
        HttpContext GetHttpContext();
    }
}