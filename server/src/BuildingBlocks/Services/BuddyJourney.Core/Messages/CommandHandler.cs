using System.Threading.Tasks;
using FluentValidation.Results;

namespace BuddyJourney.Core.Messages
{
    public abstract class CommandHandler
    {
        protected ValidationResult ValidationResult;

        protected CommandHandler()
        {
            ValidationResult = new ValidationResult();
        }

        protected void AddError(string message)
        {
            ValidationResult.Errors.Add(new ValidationFailure(string.Empty, message));
        }
        
        protected async Task<ValidationResult> GetErrors()
        {
            return ValidationResult;
        }
    }
}