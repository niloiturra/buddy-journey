using BuddyJourneyIdentityApi.Interfaces;
using BuddyJourneyIdentityApi.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourneyIdentityApi.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            
            services.AddTransient<IEmailSenderService, EmailSenderService>();
        }
    }
}