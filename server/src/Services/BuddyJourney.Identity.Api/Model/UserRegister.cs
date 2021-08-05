using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Identity.Api.Model
{
    public class UserRegister
    {
        [Required(ErrorMessage = "O campo email é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo email está em formato inválido")]
        [StringLength(200, ErrorMessage = "O campo email precisa ter no máximo {1} caracteres")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [StringLength(200, ErrorMessage = "O campo nome precisa ter no máximo {1} caracteres")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 8)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmPassword { get; set; }
    }
}