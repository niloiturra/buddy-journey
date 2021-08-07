using System.Threading.Tasks;
using BuddyJourney.Profile.Api.Interfaces;
using BuddyJourney.WebApi.Core.Controller;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Controller
{
    [Route("api/profile")]
    public class ProfileController: BaseController
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
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
    }
}