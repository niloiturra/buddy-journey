using System.Collections.Generic;
using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Data.Dto;
using BuddyJourney.Groups.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Interfaces
{
    public interface IGroupsService
    {
        IEnumerable<GroupsInfoDto> GetBySearch(string searchTerm);
        Task<Models.Groups> GetById(ObjectId groupId);
        Task<Models.Groups> RegisterGroup(GroupsDto groupDto, string uriImage);
        Task<Models.Groups> AssociateUser(string groupId, UserProfileEmbed user);
    }
}