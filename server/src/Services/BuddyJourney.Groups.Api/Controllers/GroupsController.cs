using System.Threading.Tasks;
using BuddyJourney.Groups.Api.Interfaces;
using BuddyJourney.Groups.Api.Models.Dto;
using BuddyJourney.WebApi.Core.Controller;
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

        public GroupsController(IAspNetUser user, IGroupsService groupsService)
        {
            _user = user;
            _groupsService = groupsService;
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

            var result = await _groupsService.RegisterGroup(groupDto);

            if (result == null) return Ok();
            
            AddProcessingError("Não foi possível criar um grupo");
            return CustomResponse();
        }
    }
}