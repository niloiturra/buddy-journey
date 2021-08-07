using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Profile.Api.Interfaces;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Services
{
    public class ProfileService: IProfileService
    {
        private readonly IMongoRepository<Models.Profile> _profileRepository;

        public ProfileService(IMongoRepository<Models.Profile> profileRepository)
        {
            _profileRepository = profileRepository;
        }
        
        public async Task<Models.Profile> GetByUserId(ObjectId userId)
        {
            return await _profileRepository.FindOneAsync(x => x.User.Id == userId);
        }
    }
}