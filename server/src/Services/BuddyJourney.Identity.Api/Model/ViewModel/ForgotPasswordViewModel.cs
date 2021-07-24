using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Identity.Api.Model.ViewModel
{
    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = "O campo email é obrigatório")]
        public string Email { get; set; }
    }
}