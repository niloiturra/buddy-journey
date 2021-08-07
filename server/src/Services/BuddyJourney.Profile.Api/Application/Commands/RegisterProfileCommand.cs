using BuddyJourney.Core.Messages;
using FluentValidation;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Application.Commands
{
    public class RegisterProfileCommand: Command
    {
        public ObjectId Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }

        public RegisterProfileCommand(ObjectId id, string name, string email)
        {
            Id = id;
            Name = name;
            Email = email;
        }

        public override bool IsValid()
        {
            ValidationResult = new RegisterProfileValidation().Validate(this);
            return ValidationResult.IsValid;
        }

        private class RegisterProfileValidation : AbstractValidator<RegisterProfileCommand>
        {
            public RegisterProfileValidation()
            {
                RuleFor(c => c.Id)
                    .NotEqual(ObjectId.Empty)
                    .WithMessage("Id do usuário inválido");

                RuleFor(c => c.Name)
                    .NotEmpty()
                    .WithMessage("O nome do usuário não foi informado");

                RuleFor(c => c.Email)
                    .Must(TerEmailValido)
                    .WithMessage("O e-mail informado não é válido.");
            }

            protected static bool TerEmailValido(string email)
            {
                return Core.DomainObjects.Email.Validate(email);
            }
        }
    }
}