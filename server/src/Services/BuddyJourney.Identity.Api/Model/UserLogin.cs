using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Identity.Api.Model
{
    public class UserLogin
    {
        [Required(ErrorMessage = "O campo email é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo email está em formato inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 8)]
        public string Password { get; set; }
    }
}