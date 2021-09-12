using System.Collections.Generic;
using System.Threading.Tasks;
using BuddyJourney.Groups.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Interfaces
{
    public interface IGroupsService
    {
        IEnumerable<GroupsInfoDto> GetBySearch(string searchTerm);
        Task<Models.Groups> GetById(ObjectId groupId);
        Task<Models.Groups> RegisterGroup(GroupsDto groupDto, string uriImage);
    }
}