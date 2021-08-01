using System;
using System.Threading;
using System.Threading.Tasks;
using BuddyJourney.Core.Mediator;
using BuddyJourney.Core.Messages.Integration;
using BuddyJourney.MessageBus;
using BuddyJourney.Profile.Api.Application.Commands;
using FluentValidation.Results;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BuddyJourney.Profile.Api.Services
{
    public class RegisterProfileIntegrationHandle: BackgroundService
    {
        private readonly IMessageBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public RegisterProfileIntegrationHandle(
            IServiceProvider serviceProvider,
            IMessageBus bus)
        {
            _serviceProvider = serviceProvider;
            _bus = bus;
        }

        private void SetResponder()
        {
            _bus.RespondAsync<UserRegisterIntegrationEvent, ResponseMessage>(async request =>
                await RegisterProfile(request));

            _bus.AdvancedBus.Connected += OnConnect;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            SetResponder();
            return Task.CompletedTask;
        }

        private void OnConnect(object s, EventArgs e)
        {
            SetResponder();
        }

        private async Task<ResponseMessage> RegisterProfile(UserRegisterIntegrationEvent message)
        {
            var profileCommand = new RegisterProfileCommand(message.Id, message.Name, message.Email);
            ValidationResult success;

            using (var scope = _serviceProvider.CreateScope())
            {
                var mediator = scope.ServiceProvider.GetRequiredService<IMediatorHandler>();
                success = await mediator.SendCommand(profileCommand);
            }

            return new ResponseMessage(success);
        }
    }
}