using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Groups.Api.Interfaces;
using BuddyJourney.Groups.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Services
{
    public class GroupsService : IGroupsService
    {
        private readonly IMongoRepository<Models.Groups> _groupsRepository;

        public GroupsService(IMongoRepository<Models.Groups> groupsRepository)
        {
            _groupsRepository = groupsRepository;
        }

        public IEnumerable<GroupsInfoDto> GetBySearch(string searchTerm)
        {
            IEnumerable<Models.Groups> groups;
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                groups = _groupsRepository.AsQueryable();
            }
            else
            {
                var searchTermLower = searchTerm.ToLower();
                groups = _groupsRepository.FilterBy(x =>
                    x.Description.ToLower().Contains(searchTermLower) ||
                    x.Destination.ToLower().Contains(searchTermLower) ||
                    x.Name.ToLower().Contains(searchTermLower));
            }

            if (groups == null || !groups.Any())
            {
                return null;
            }

            return groups.Select(g => new GroupsInfoDto
            {
                Id = g.Id.ToString(),
                Description = g.Description,
                Destination = g.Destination,
                Picture = g.Picture,
                Name = g.Name,
                CreatedBy = g.Administrator.Name,
                TravelDate = g.TravelDate
            });
        }

        public async Task<Models.Groups> GetById(ObjectId groupId)
        {
            return await _groupsRepository.FindOneAsync(x => x.Id == groupId);
        }

        public IEnumerable<Models.Groups> GetByUser(ObjectId userId)
        {
            return _groupsRepository.FilterBy(x =>
                x.Administrator.UserId == userId ||
                x.Members.Any(y => y.UserId == userId));
        }

        public async Task<Models.Groups> RegisterGroup(GroupsDto groupDto, string uriImage)
        {
            groupDto.UriImage = uriImage;
            var group = new Models.Groups(groupDto);

            if (!group.IsValid())
            {
                return group;
            }

            await _groupsRepository.InsertOneAsync(group);
            return null;
        }

        public async Task<Models.Groups> AssociateUser(string groupId, UserProfileEmbed user)
        {
            var group = await _groupsRepository.FindByIdAsync(groupId);

            if (group.Members != null && group.Members.Any(x => x.UserId == user.UserId) ||
                group.Administrator.UserId == user.UserId)
            {
                return null;
            }

            group.AddMember(user);

            await _groupsRepository.ReplaceOneAsync(group);
            return group;
        }
    }
}