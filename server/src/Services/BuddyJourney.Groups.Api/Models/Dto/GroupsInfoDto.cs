using System;
using System.Collections.Generic;
using BuddyJourney.Core.Data.Dto;

namespace BuddyJourney.Groups.Api.Models.Dto
{
    public class GroupsInfoDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public string Description { get; set; }
        public string Destination { get; set; }
        public string CreatedBy { get; set; }
        public DateTime TravelDate { get; set; }
        public bool UserIncluded { get; set; }
        public UserProfileEmbedDto Administrator { get; set; }
        public List<UserProfileEmbedDto> Members { get; set; } = new List<UserProfileEmbedDto>();
    }
}