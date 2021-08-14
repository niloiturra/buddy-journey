using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using BuddyJourney.Profile.Api.Interfaces;
using BuddyJourney.WebApi.Core.Controller;
using BuddyJourney.WebApi.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Controller
{
    [Route("api/profile")]
    public class ProfileController : BaseController
    {
        private readonly IProfileService _profileService;
        private readonly IBlobStorageService _blobStorageService;

        public ProfileController(IProfileService profileService, IBlobStorageService blobStorageService)
        {
            _profileService = profileService;
            _blobStorageService = blobStorageService;
        }

        [HttpGet]
        public async Task<ActionResult> GetByUserId([FromQuery] string userId)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var profile = await _profileService.GetByUserId(ObjectId.Parse(userId));

            if (profile != null) return Ok(profile);

            AddProcessingError("Não foi possível encontrar um perfil com esse Id");
            return CustomResponse();
        }

        [HttpPost]
        public async Task<ActionResult> PostImage([FromBody] ImageExample image)
        {
            return Ok(await _blobStorageService.UploadBase64Image(image.ImageName, image.ImageBase64));
        }
    }

    public class ImageExample
    {
        public string ImageName { get; set; }
        public string ImageBase64 { get; set; }
    }
}