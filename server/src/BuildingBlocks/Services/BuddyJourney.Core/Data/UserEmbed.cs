using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace BuddyJourney.Core.Data
{
    public class UserEmbed
    {
        [Required]
        public ObjectId Id { get; set; }
        [Required]
        public string Email { get; set; }
    }
}