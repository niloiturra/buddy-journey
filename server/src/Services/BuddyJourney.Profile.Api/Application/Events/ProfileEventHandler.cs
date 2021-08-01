using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace BuddyJourney.Profile.Api.Application.Events
{
    public class ProfileEventHandler : INotificationHandler<ProfileRegisterEvent>
    {
        public Task Handle(ProfileRegisterEvent notification, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}