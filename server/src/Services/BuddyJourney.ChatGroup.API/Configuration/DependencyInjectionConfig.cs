using BuddyJourney.ChatGroup.API.Interfaces;
using BuddyJourney.ChatGroup.API.Services;
using BuddyJourney.Core.Data;
using BuddyJourney.WebApi.Core.User;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourney.ChatGroup.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<IAspNetUser, AspNetUser>();
        }
    }
}