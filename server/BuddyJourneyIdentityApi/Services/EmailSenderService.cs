using System.IO;
using System.Text;
using System.Threading.Tasks;
using BuddyJourneyIdentityApi.Interfaces;
using BuddyJourneyIdentityApi.Model;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace BuddyJourneyIdentityApi.Services
{
    public class EmailSenderService: IEmailSenderService
    {
        public AuthMessageSenderOptions Options { get; }

        public EmailSenderService(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }
        
        public Task SendEmailAsync(string email, string subject, string link)
        {
            return Execute(Options.SendGridKey, subject, link, email);
        }

        private Task Execute(string apiKey, string subject, string link, string email)
        {
            var client = new SendGridClient(apiKey);
            var mail = new SendGridMessage()
            {
                From = new EmailAddress("buddy_journey_@outlook.com", Options.SendGridUser),
                Subject = subject,
                HtmlContent = BuilderHtmlWithParameters(email, link)
            };

            mail.AddTo(new EmailAddress(email));
            mail.SetClickTracking(false, false);

            return client.SendEmailAsync(mail);
        }

        private string BuilderHtmlWithParameters(string email, string link)
        {
            var builder = new StringBuilder();

            using (var reader = File.OpenText("Template/template-forgot-password.html"))
            {
                builder.Append(reader.ReadToEnd());
            }

            builder.Replace("{{nome.usuario}}", email);
            builder.Replace("{{link}}", link);

            return builder.ToString();
        }
    }
}