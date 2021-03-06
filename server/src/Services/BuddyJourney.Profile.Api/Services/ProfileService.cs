using System.Threading.Tasks;
using BuddyJourney.Core.Data;
using BuddyJourney.Profile.Api.Interfaces;
using BuddyJourney.Profile.Api.Models.Dto;
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

        public async Task<Models.Profile> UpdateProfile(ProfileDto profileDto, ObjectId userId)
        {
            var profile = await _profileRepository.FindOneAsync(x => x.User.Id == userId);
            
            profile.UpdateProperties(profileDto);

            if (!profile.IsValid()) return profile;
            
            await _profileRepository.ReplaceOneAsync(profile);
            return null;
        }

        public async Task<Models.Profile> UpdateProfileImage(string uriImage, ObjectId userId)
        {
            var profile = await _profileRepository.FindOneAsync(x => x.User.Id == userId);
            
            profile.SetPicture(uriImage);
            
            if (!profile.IsValid()) return profile;
            
            await _profileRepository.ReplaceOneAsync(profile);
            return profile;
        }
    }
}