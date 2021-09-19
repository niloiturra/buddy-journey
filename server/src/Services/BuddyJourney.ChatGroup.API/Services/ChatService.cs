using System.Collections.Generic;
using BuddyJourney.ChatGroup.API.Interfaces;
using BuddyJourney.ChatGroup.API.Models;
using BuddyJourney.Core.Data;

namespace BuddyJourney.ChatGroup.API.Services
{
    public class ChatService: IChatService
    {
        private readonly IMongoRepository<Models.Messages> _messagesRepository;

        public ChatService(IMongoRepository<Messages> messagesRepository)
        {
            _messagesRepository = messagesRepository;
        }

        public void Save(ChatMessage message)
        {
            var newMessage = new Messages
            {
                Message = message.Message,
                CreatedAt = message.CreatedAt,
                User = new UserProfileEmbedMessage
                {
                    Name = message.Name,
                    Picture = message.Picture
                }
            };
            
            _messagesRepository.InsertOne(newMessage);
        }

        public IEnumerable<Messages> GetAllFromGroup(string groupId)
        {
            return _messagesRepository.FilterBy(x => x.GroupId == groupId);
        }
    }
}