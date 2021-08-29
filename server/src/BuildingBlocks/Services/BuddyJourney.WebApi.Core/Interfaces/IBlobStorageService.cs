using System.Threading.Tasks;

namespace BuddyJourney.WebApi.Core.Interfaces
{
    public interface IBlobStorageService
    {
        Task<string> UploadBase64Image(string fileName, string base64Image);
        Task DeleteImage(string uriFile);
    }
}