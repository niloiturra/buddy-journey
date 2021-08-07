using System.Threading.Tasks;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Interfaces
{
    public interface IProfileService
    {
        Task<Models.Profile> GetByUserId(ObjectId userId);
    }
}