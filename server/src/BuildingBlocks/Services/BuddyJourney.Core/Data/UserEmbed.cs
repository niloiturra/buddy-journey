using MongoDB.Bson;

namespace BuddyJourney.Core.Data
{
    public class UserEmbed
    {
        public ObjectId Id { get; set; }
        public string Email { get; set; }
    }
}