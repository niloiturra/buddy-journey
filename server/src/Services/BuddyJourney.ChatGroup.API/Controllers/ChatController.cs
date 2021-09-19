using System;
using System.Threading.Tasks;
using BuddyJourney.ChatGroup.API.Hubs;
using BuddyJourney.ChatGroup.API.Hubs.Clients;
using BuddyJourney.ChatGroup.API.Interfaces;
using BuddyJourney.ChatGroup.API.Models;
using BuddyJourney.WebApi.Core.Controller;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BuddyJourney.ChatGroup.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class ChatController : BaseController
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private readonly IChatService _chatService;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, IChatService chatService)
        {
            _chatHub = chatHub;
            _chatService = chatService;
        }

        [HttpPost("join/group")]
        public async Task AddToGroup([FromBody] JoinGroupMessage joinGroupMessage)
        {
            await _chatHub.Groups.AddToGroupAsync(joinGroupMessage.ConnectionId, joinGroupMessage.GroupName);
        }

        [HttpPost("messages")]
        public async Task Post([FromBody] ChatMessage message)
        {
            if (!ModelState.IsValid)
            {
                return;
            }

            await _chatHub.Clients.Group(message.GroupName).ReceiveMessage(message);
            _chatService.Save(message);
        }

        [HttpGet("messages")]
        public IActionResult GetAllFromGroup([FromQuery] string groupId)
        {
            try
            {
                return Ok(_chatService.GetAllFromGroup(groupId));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}