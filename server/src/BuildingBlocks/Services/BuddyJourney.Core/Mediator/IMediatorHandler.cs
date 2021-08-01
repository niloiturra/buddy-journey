using System.Threading.Tasks;
using BuddyJourney.Core.Messages;
using FluentValidation.Results;

namespace BuddyJourney.Core.Mediator
{
    public interface IMediatorHandler
    {
        Task PublishEvent<T>(T @event) where T : Event;
        Task<ValidationResult> SendCommand<T>(T command) where T : Command;
    }
}