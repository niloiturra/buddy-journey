namespace BuddyJourney.WebApi.Core.Model
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int ExpirationHours { get; set; }
        public string Issuer { get; set; }
        public string ValidOn { get; set; }
        public string WebForgotPasswordRedirect { get; set; }
    }
}