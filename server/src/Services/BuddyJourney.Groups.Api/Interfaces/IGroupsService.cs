using System.Threading.Tasks;
using BuddyJourney.Groups.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Interfaces
{
    public interface IGroupsService
    {
        Task<Models.Groups> GetById(ObjectId groupId);
        Task<Models.Groups> RegisterGroup(GroupsDto groupDto);
    }
}