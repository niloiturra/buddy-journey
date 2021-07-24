using BuddyJourney.Identity.Api.Interfaces;
using BuddyJourney.Identity.Api.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourney.Identity.Api.Configuration
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