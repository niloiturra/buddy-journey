using BuddyJourney.Core.Data;
using BuddyJourney.Groups.Api.Interfaces;
using BuddyJourney.Groups.Api.Services;
using BuddyJourney.WebApi.Core.User;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourney.Groups.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));
            services.AddScoped<IGroupsService, GroupsService>();
            services.AddScoped<IAspNetUser, AspNetUser>();
        }
    }
}