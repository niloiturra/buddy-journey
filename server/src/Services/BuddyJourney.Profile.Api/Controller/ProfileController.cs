using System.Linq;
using System.Threading.Tasks;
using BuddyJourney.Profile.Api.Interfaces;
using BuddyJourney.Profile.Api.Models.ViewModel;
using BuddyJourney.WebApi.Core.Controller;
using BuddyJourney.WebApi.Core.Interfaces;
using BuddyJourney.WebApi.Core.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Controller
{
    [Authorize]
    [Route("api/profile")]
    public class ProfileController : BaseController
    {
        private readonly IAspNetUser _user;
        private readonly IProfileService _profileService;
        private readonly IBlobStorageService _blobStorageService;

        public ProfileController(IAspNetUser user, IProfileService profileService, IBlobStorageService blobStorageService)
        {
            _user = user;
            _profileService = profileService;
            _blobStorageService = blobStorageService;
        }

        [HttpGet]
        public async Task<ActionResult> GetByUserId()
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var profile = await _profileService.GetByUserId(ObjectId.Parse(_user.GetUserId()));

            if (profile != null) return Ok(profile);

            AddProcessingError("Não foi possível encontrar um perfil com esse Id");
            return CustomResponse();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile([FromBody] ProfileViewModel profileViewModel)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var updatedProfile = await _profileService.UpdateProfile(profileViewModel, ObjectId.Parse(_user.GetUserId()));

            if (updatedProfile == null) return NoContent();
            
            updatedProfile.ValidationResult.Errors.ToList().ForEach(e => AddProcessingError(e.ErrorMessage));
            return CustomResponse();
        }

        [HttpPut("image")]
        public async Task<IActionResult> UpdateProfileImage([FromBody] UploadImageViewModel imageToUpload)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            if (!string.IsNullOrEmpty(imageToUpload.UriImage))
            {
                await _blobStorageService.DeleteImage(imageToUpload.UriImage);
            }

            var uriImage =
                await _blobStorageService.UploadBase64Image(imageToUpload.ImageName, imageToUpload.ImageBase64);
            
            var updatedProfileImage = await _profileService.UpdateProfileImage(uriImage, ObjectId.Parse(_user.GetUserId()));

            if (updatedProfileImage == null) return CustomResponse();

            if (updatedProfileImage.ValidationResult != null)
            {
                updatedProfileImage.ValidationResult.Errors.ToList().ForEach(e => AddProcessingError(e.ErrorMessage));
                return CustomResponse();
            }

            return Ok(updatedProfileImage.Picture);
        }
    }
}