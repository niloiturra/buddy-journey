using System.Collections.Generic;
using BuddyJourney.ChatGroup.API.Models;
using BuddyJourney.ChatGroup.API.Models.Dto;

namespace BuddyJourney.ChatGroup.API.Interfaces
{
    public interface IChatService
    {
        void Save(ChatMessage message);
        IEnumerable<MessagesDto> GetAllFromGroup(string groupId, string userId);
    }
}