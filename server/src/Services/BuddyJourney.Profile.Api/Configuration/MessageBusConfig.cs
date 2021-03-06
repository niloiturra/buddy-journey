using BuddyJourney.Core.Utils;
using BuddyJourney.MessageBus;
using BuddyJourney.Profile.Api.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourney.Profile.Api.Configuration
{
    public static class MessageBusConfig
    {
        public static void AddMessageBusConfiguration(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddMessageBus(configuration.GetMessageQueueConnection("MessageBus"))
                .AddHostedService<RegisterProfileIntegrationHandle>();
        }
    }
}