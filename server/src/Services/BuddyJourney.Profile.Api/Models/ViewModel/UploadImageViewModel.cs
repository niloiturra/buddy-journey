using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Profile.Api.Models.ViewModel
{
    public class UploadImageViewModel
    {
        [Required]
        public string ImageName { get; set; }
        [Required]
        public string ImageBase64 { get; set; }
        public string UriImage { get; set; }
    }
}