using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Core.Data
{
    public class UserProfileEmbedMessage
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
    }
}