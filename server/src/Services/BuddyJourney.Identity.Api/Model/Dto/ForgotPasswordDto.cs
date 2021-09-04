using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.Identity.Api.Model.Dto
{
    public class ForgotPasswordDto
    {
        [Required(ErrorMessage = "O campo email é obrigatório")]
        public string Email { get; set; }
    }
}