using System;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Utils;
using BuddyJourney.Groups.Api.Models.Dto;
using FluentValidation;
using FluentValidation.Results;
using MongoDB.Bson.Serialization.Attributes;

namespace BuddyJourney.Groups.Api.Models
{
    [BsonCollection("Groups")]
    public class Groups : Document
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string Destination { get; private set; }
        public DateTime TravelDate { get; private set; }
        public int NumberMaxOfMembers { get; private set; }
        [BsonIgnore] public ValidationResult ValidationResult { get; set; }

        public Groups(GroupsDto gruposDto)
        {
            Name = gruposDto.Name;
            Description = gruposDto.Description;
            Destination = gruposDto.Destination;
            TravelDate = gruposDto.TravelDate;
            NumberMaxOfMembers = gruposDto.NumberMaxOfMembers;
        }
        
        public bool IsValid()
        {
            return new GroupsValidation().Validate(this).IsValid;
        }
        
        public class GroupsValidation : AbstractValidator<Groups>
        {
            public GroupsValidation()
            {
                RuleFor(c => c.Name)
                    .NotEmpty()
                    .WithMessage("Nome é obrigatório");

                RuleFor(c => c.Description)
                    .NotEmpty()
                    .WithMessage("Descrição é obrigatório");
                
                RuleFor(c => c.Destination)
                    .NotEmpty()
                    .WithMessage("Destino é obrigatório");
                
                RuleFor(c => c.TravelDate)
                    .NotEmpty()
                    .WithMessage("Data de viagem é obrigatório");
                
                RuleFor(c => c.NumberMaxOfMembers)
                    .NotEmpty()
                    .WithMessage("Número máximo de membros é obrigatório");
            }
        }
    }
}