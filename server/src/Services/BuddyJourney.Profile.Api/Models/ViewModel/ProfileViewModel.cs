using System;
using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Profile.Api.Models.ViewModel
{
    public class ProfileViewModel
    {
        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public string Name { get; set; }
        public string Picture { get; set; }
        public DateTime BirthDay { get; set; }
        public string Location { get; set; }
        public string Biography { get; set; }
        public string BestTrip { get; set; }
    }
}