using System.Threading.Tasks;
using BuddyJourney.Profile.Api.Models.ViewModel;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Interfaces
{
    public interface IProfileService
    {
        Task<Models.Profile> GetByUserId(ObjectId userId);
        Task<Models.Profile> UpdateProfile(ProfileViewModel profileView, ObjectId userId);
    }
}