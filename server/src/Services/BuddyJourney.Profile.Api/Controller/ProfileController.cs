using System.Linq;
using System.Threading.Tasks;
using BuddyJourney.Profile.Api.Interfaces;
using BuddyJourney.Profile.Api.Models.ViewModel;
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

        [HttpPut]
        public async Task<ActionResult> UpdateProfile([FromQuery] string userId, [FromBody] ProfileViewModel profileViewModel)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var updatedProfile = await _profileService.UpdateProfile(profileViewModel, ObjectId.Parse(userId));

            if (updatedProfile == null) return NoContent();
            
            updatedProfile.ValidationResult.Errors.ToList().ForEach(e => AddProcessingError(e.ErrorMessage));
            return CustomResponse();
        }
    }

    public class ImageExample
    {
        public string ImageName { get; set; }
        public string ImageBase64 { get; set; }
    }
}