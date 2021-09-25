using System;
using System.Threading.Tasks;
using BuddyJourney.ChatGroup.API.Hubs;
using BuddyJourney.ChatGroup.API.Hubs.Clients;
using BuddyJourney.ChatGroup.API.Interfaces;
using BuddyJourney.ChatGroup.API.Models;
using BuddyJourney.ChatGroup.API.Models.Dto;
using BuddyJourney.WebApi.Core.Controller;
using BuddyJourney.WebApi.Core.User;
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
        private readonly IAspNetUser _user;
        private readonly IChatService _chatService;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, IChatService chatService, IAspNetUser user)
        {
            _chatHub = chatHub;
            _chatService = chatService;
            _user = user;
        }

        [HttpPost("join/group")]
        public async Task AddToGroup([FromBody] JoinGroupMessage joinGroupMessage)
        {
            await _chatHub.Groups.AddToGroupAsync(joinGroupMessage.ConnectionId, joinGroupMessage.GroupName);
            await NotifyNewMemberArrives(joinGroupMessage.GroupName);
        }

        [HttpPost("messages")]
        public async Task Post([FromBody] ChatMessage message)
        {
            if (!ModelState.IsValid)
            {
                return;
            }

            var userId = _user.GetUserId();

            message.CreatedAt = DateTime.Now;
            message.UserId = userId;
            await _chatHub.Clients.Group(message.GroupName).ReceiveMessage(message);
            
            _chatService.Save(message);
        }

        [HttpGet("messages")]
        public IActionResult GetAllFromGroup([FromQuery] string groupId)
        {
            try
            {
                var userId = _user.GetUserId();
                return Ok(_chatService.GetAllFromGroup(groupId, userId));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private async Task NotifyNewMemberArrives(string groupName)
        {
            var message = new ChatMessage
            {
                Message = "Um novo membro ingressou no grupo!",
                Name = "Sistema"
            };
            
            await _chatHub.Clients.Group(groupName).NewMemberArrives(message);
        }
    }
}