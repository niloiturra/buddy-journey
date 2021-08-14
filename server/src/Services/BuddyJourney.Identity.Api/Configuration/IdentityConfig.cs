using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using BuddyJourney.Identity.Api.Extensions;
using BuddyJourney.Identity.Api.Model;
using BuddyJourney.WebApi.Core.Configuration.Auth;
using BuddyJourney.WebApi.Core.Model;

namespace BuddyJourney.Identity.Api.Configuration
{
    public static class IdentityConfig
    {
        public static IServiceCollection AddIdentityConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            var buddyJourneyDatabaseSettings = configuration.GetSection("BuddyJourneyDatabaseSettings")
                .Get<BuddyJourneyDatabaseSettings>();

            services.AddIdentityMongoDbProvider<MongoUser, MongoRole>(identity =>
                    {
                        identity.Password.RequiredLength = 8;
                        identity.Password.RequireDigit = false;
                        identity.Password.RequireLowercase = false;
                        identity.Password.RequireUppercase = false;
                        identity.Password.RequireNonAlphanumeric = false;
                        identity.User.RequireUniqueEmail = true;
                    },
                    mongo =>
                    {
                        mongo.ConnectionString = buddyJourneyDatabaseSettings.ConnectionStringWithDatabaseName();
                    })
                .AddErrorDescriber<IdentityTranslateMessages>();

            services.Configure<AuthMessageSenderOptions>(configuration);
            services.AddJwtConfiguration(configuration);
            return services;
        }
    }
}