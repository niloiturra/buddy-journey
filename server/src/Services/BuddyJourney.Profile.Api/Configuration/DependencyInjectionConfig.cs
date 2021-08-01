using BuddyJourney.Core.Data;
using BuddyJourney.Core.Mediator;
using BuddyJourney.Profile.Api.Application.Commands;
using BuddyJourney.Profile.Api.Application.Events;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourney.Profile.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<IMediatorHandler, MediatorHandler>();
            services.AddScoped<IRequestHandler<RegisterProfileCommand, ValidationResult>, ProfileCommandHandler>();
            services.AddScoped<INotificationHandler<ProfileRegisterEvent>, ProfileEventHandler>();
        }
    }
}