using System;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Utils;
using BuddyJourney.Profile.Api.Models.Dto;
using FluentValidation;
using FluentValidation.Results;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BuddyJourney.Profile.Api.Models
{
    [BsonCollection("Profile")]
    public class Profile : Document
    {
        [BsonIgnore] private const int MAX_AGE = 18;
        public UserEmbed User { get; private set; }
        public string Name { get; private set; }
        public string Picture { get; private set; }
        public DateTime BirthDay { get; private set; }
        public string Location { get; private set; }
        public string Biography { get; private set; }
        public string BestTrip { get; private set; }

        [BsonIgnore]
        public ValidationResult ValidationResult { get; set; }

        public Profile(ObjectId userId, string name, string email)
        {
            Name = name;
            User = new UserEmbed
            {
                Email = email,
                Id = userId
            };
        }

        public void UpdateProperties(ProfileDto profileDto)
        {
            Name = profileDto.Name;
            BirthDay = profileDto.BirthDay;
            Location = profileDto.Location;
            Biography = profileDto.Biography;
            BestTrip = profileDto.BestTrip;
        }

        public void SetPicture(string uriImage)
        {
            Picture = uriImage;
        }

        public bool IsValid()
        {
            return new ProfileValidation().Validate(this).IsValid;
        }

        public class ProfileValidation : AbstractValidator<Profile>
        {
            public ProfileValidation()
            {
                RuleFor(c => c.Name)
                    .NotEmpty()
                    .WithMessage("Nome é obrigatório");

                RuleFor(c => c.BirthDay.AddYears(MAX_AGE))
                    .LessThanOrEqualTo(DateTime.Now)
                    .WithMessage("Idade inválida! É necessário ter idade superior a 18 anos");
            }
        }
    }
}