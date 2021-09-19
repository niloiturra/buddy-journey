using System.Collections.Generic;
using BuddyJourney.ChatGroup.API.Models;

namespace BuddyJourney.ChatGroup.API.Interfaces
{
    public interface IChatService
    {
        void Save(ChatMessage message);
        IEnumerable<Messages> GetAllFromGroup(string groupId);
    }
}