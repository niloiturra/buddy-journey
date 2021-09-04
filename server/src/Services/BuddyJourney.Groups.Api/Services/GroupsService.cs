using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Groups.Api.Interfaces;
using BuddyJourney.Groups.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Services
{
    public class GroupsService: IGroupsService
    {
        private readonly IMongoRepository<Models.Groups> _groupsRepository;

        public GroupsService(IMongoRepository<Models.Groups> groupsRepository)
        {
            _groupsRepository = groupsRepository;
        }
        
        public async Task<Models.Groups> GetById(ObjectId groupId)
        {
            return await _groupsRepository.FindOneAsync(x => x.Id == groupId);
        }

        public async Task<Models.Groups> RegisterGroup(GroupsDto groupDto)
        {
            var group = new Models.Groups(groupDto);
            await _groupsRepository.InsertOneAsync(group);

            return null;
        }
    }
}