using System.Threading.Tasks;
using BuddyJourney.ChatGroup.API.Models;

namespace BuddyJourney.ChatGroup.API.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}