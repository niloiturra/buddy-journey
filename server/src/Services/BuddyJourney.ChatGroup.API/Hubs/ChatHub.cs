using BuddyJourney.ChatGroup.API.Hubs.Clients;
using Microsoft.AspNetCore.SignalR;

namespace BuddyJourney.ChatGroup.API.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
    }
}