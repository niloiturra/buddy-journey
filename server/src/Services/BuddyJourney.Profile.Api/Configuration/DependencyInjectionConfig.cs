using BuddyJourney.Core.Data;
using BuddyJourney.Core.Mediator;
using BuddyJourney.Profile.Api.Application.Commands;
using BuddyJourney.Profile.Api.Application.Events;
using BuddyJourney.Profile.Api.Interfaces;
using BuddyJourney.Profile.Api.Services;
using BuddyJourney.WebApi.Core.Interfaces;
using BuddyJourney.WebApi.Core.Services;
using BuddyJourney.WebApi.Core.User;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace BuddyJourney.Profile.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<IMediatorHandler, MediatorHandler>();
            services.AddScoped<IRequestHandler<RegisterProfileCommand, ValidationResult>, ProfileCommandHandler>();
            services.AddScoped<INotificationHandler<ProfileRegisterEvent>, ProfileEventHandler>();
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IAspNetUser, AspNetUser>();

            services.AddTransient<IBlobStorageService, BlobStorageService>();
        }
    }
}