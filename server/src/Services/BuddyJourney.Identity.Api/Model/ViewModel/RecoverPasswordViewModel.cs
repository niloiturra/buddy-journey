using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Identity.Api.Model.ViewModel
{
    public class RecoverPasswordViewModel
    {
        [Required(ErrorMessage = "O email é obrigatório")]
        public string EmailEncoded { get; set; }
        
        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(100, ErrorMessage = "O campo senha precisa ter entre {2} e {1} caracteres", MinimumLength = 8)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "As senhas não conferem.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Não foi possível resgatar o código de identificação")]
        public string CodeEncoded { get; set; }
    }
}