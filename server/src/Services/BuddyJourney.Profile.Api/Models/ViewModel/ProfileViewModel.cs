using System;
using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Profile.Api.Models.ViewModel
{
    public class ProfileViewModel
    {
        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo senha precisa ter no máximo {1} caracteres")]
        public string Name { get; set; }
        public DateTime BirthDay { get; set; }
        [StringLength(200, ErrorMessage = "A localização deve ter no máximo {1} caracteres")]
        public string Location { get; set; }
        [StringLength(200, ErrorMessage = "Sua melhor viagem deve ter no máximo {1} caracteres")]
        public string Biography { get; set; }
        [StringLength(500, ErrorMessage = "Sua biografia deve ter no máximo {1} caracteres")]
        public string BestTrip { get; set; }
    }
}