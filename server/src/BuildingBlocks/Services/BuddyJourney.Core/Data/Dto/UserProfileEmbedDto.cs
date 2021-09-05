using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace BuddyJourney.Core.Data.Dto
{
    public class UserProfileEmbedDto
    {
        public ObjectId UserId { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string Picture { get; set; }
    }
}