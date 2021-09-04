using System.Threading.Tasks;
using BuddyJourney.Profile.Api.Models.Dto;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Interfaces
{
    public interface IProfileService
    {
        Task<Models.Profile> GetByUserId(ObjectId userId);
        Task<Models.Profile> UpdateProfile(ProfileDto profileView, ObjectId userId);
        Task<Models.Profile> UpdateProfileImage(string image, ObjectId userId);
    }
}