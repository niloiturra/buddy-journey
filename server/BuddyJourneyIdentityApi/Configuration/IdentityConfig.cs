using BuddyJourneyWebApi.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.Mongo.Model;
using BuddyJourneyIdentityApi.Model;
using BuddyJourneyWebApi.Model;

namespace BuddyJourneyIdentityApi.Configuration
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
            }, mongo =>
            {
                mongo.ConnectionString = buddyJourneyDatabaseSettings.ConnectionStringWithDatabaseName();
            });

            services.Configure<AuthMessageSenderOptions>(configuration);
            services.AddJwtConfiguration(configuration);
            return services;
        }
    }
}