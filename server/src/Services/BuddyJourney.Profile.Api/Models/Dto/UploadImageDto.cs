using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Profile.Api.Models.Dto
{
    public class UploadImageDto
    {
        [Required]
        public string ImageName { get; set; }
        [Required]
        public string ImageBase64 { get; set; }
        public string UriImage { get; set; }
    }
}