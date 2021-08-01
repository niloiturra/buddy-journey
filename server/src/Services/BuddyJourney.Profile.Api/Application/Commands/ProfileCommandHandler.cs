using System.Threading;
using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Messages;
using BuddyJourney.Profile.Api.Application.Events;
using FluentValidation.Results;
using MediatR;

namespace BuddyJourney.Profile.Api.Application.Commands
{
    public class ProfileCommandHandler: CommandHandler,
        IRequestHandler<RegisterProfileCommand, ValidationResult>
    {
        private readonly IMongoRepository<Models.Profile> _profileRepository;

        public ProfileCommandHandler(IMongoRepository<Models.Profile> profileRepository)
        {
            _profileRepository = profileRepository;
        }
        
        public async Task<ValidationResult> Handle(RegisterProfileCommand message, CancellationToken cancellationToken)
        {
            if (!message.IsValid()) return message.ValidationResult;

            var profile = new Models.Profile(message.Name);

            await _profileRepository.InsertOneAsync(profile);
            profile.AddEvent(new ProfileRegisterEvent(message.Name));
            return await GetErrors();
        }
    }
}