using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace BuddyJourney.Core.Data
{
    public class UserProfileEmbed
    {
        [Required] public ObjectId UserId { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string Picture { get; set; }
    }
}