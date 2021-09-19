using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Data.Dto;
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

        public IEnumerable<GroupsInfoDto> GetBySearch(string searchTerm, ObjectId userId)
        {
            IEnumerable<Models.Groups> groups;
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                groups = _groupsRepository.FindAll();
            }
            else
            {
                var searchTermLower = searchTerm.ToLower();
                groups = _groupsRepository.FilterBy(x =>
                    x.Description.ToLower().Contains(searchTermLower) ||
                    x.Destination.ToLower().Contains(searchTermLower) ||
                    x.Name.ToLower().Contains(searchTermLower)).ToList();
            }

            if (!groups.Any())
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
                TravelDate = g.TravelDate,
                UserIncluded = IsUserAlreadyIncluded(g, userId)
            });
        }

        public async Task<Models.Groups> GetById(ObjectId groupId)
        {
            return await _groupsRepository.FindOneAsync(x => x.Id == groupId);
        }

        public IEnumerable<string> GetNamesByUserForConnection(ObjectId userId)
        {
            var groups = _groupsRepository.FilterBy(x =>
                x.Administrator.UserId == userId ||
                x.Members.Any(y => y.UserId == userId));
            
            return groups.Select(g => g.Id.ToString());
        }

        public IEnumerable<GroupsInfoDto> GetByUser(ObjectId userId)
        {
            var groups = _groupsRepository.FilterBy(x =>
                x.Administrator.UserId == userId ||
                x.Members.Any(y => y.UserId == userId));
            
            return groups.Select(g => new GroupsInfoDto
            {
                Id = g.Id.ToString(),
                Description = g.Description,
                Destination = g.Destination,
                Picture = g.Picture,
                Name = g.Name,
                CreatedBy = g.Administrator.Name,
                TravelDate = g.TravelDate,
                Administrator = new UserProfileEmbedDto
                {
                    Email = g.Administrator.Email,
                    Name = g.Administrator.Name,
                    Picture = g.Administrator.Picture,
                    UserId = g.Administrator.UserId
                },
                Members = g.Members.Select(x => new UserProfileEmbedDto
                {
                    Email = x.Email,
                    Name = x.Name,
                    Picture = x.Picture,
                    UserId = x.UserId
                }).ToList()
            });
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

        private static bool IsUserAlreadyIncluded(Models.Groups group, ObjectId userId)
        {
            return group.Administrator.UserId == userId || group.Members != null && group.Members.Any(m => m.UserId == userId);
        }
    }
}