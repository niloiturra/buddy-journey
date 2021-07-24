using System.Threading.Tasks;

namespace BuddyJourney.Identity.Api.Interfaces
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}