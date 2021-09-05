using System.Linq;
using System.Threading.Tasks;
using BuddyJourney.Groups.Api.Interfaces;
using BuddyJourney.Groups.Api.Models.Dto;
using BuddyJourney.WebApi.Core.Controller;
using BuddyJourney.WebApi.Core.Interfaces;
using BuddyJourney.WebApi.Core.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BuddyJourney.Groups.Api.Controllers
{
    [Authorize]
    [Route("api/groups")]
    public class GroupsController: BaseController
    {
        private readonly IAspNetUser _user;
        private readonly IGroupsService _groupsService;
        private readonly IBlobStorageService _blobStorageService;

        public GroupsController(IGroupsService groupsService, IBlobStorageService blobStorageService, IAspNetUser user)
        {
            _groupsService = groupsService;
            _blobStorageService = blobStorageService;
            _user = user;
        }
        
        [HttpGet]
        public async Task<ActionResult> GetById([FromQuery] string groupId)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            var group = await _groupsService.GetById(ObjectId.Parse(groupId));

            if (group != null) return Ok(group);

            AddProcessingError("Não foi possível encontrar um grupo com esse Id");
            return CustomResponse();
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(GroupsDto groupDto)
        {
            if (!ModelState.IsValid)
            {
                return CustomResponse(ModelState);
            }

            groupDto.Administrator.UserId = ObjectId.Parse(_user.GetUserId());
            
            var uriImage =
                await _blobStorageService.UploadBase64Image(groupDto.Picture.ImageName, groupDto.Picture.ImageBase64);

            var result = await _groupsService.RegisterGroup(groupDto, uriImage);

            if (result == null) return Ok();
            
            result.ValidationResult.Errors.ToList().ForEach(e => AddProcessingError(e.ErrorMessage));
            AddProcessingError("Não foi possível criar um grupo");
            return CustomResponse();
        }
    }
}