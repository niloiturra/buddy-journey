using System.Collections.Generic;
using System.Linq;
using BuddyJourney.ChatGroup.API.Interfaces;
using BuddyJourney.ChatGroup.API.Models;
using BuddyJourney.ChatGroup.API.Models.Dto;
using BuddyJourney.Core.Data;

namespace BuddyJourney.ChatGroup.API.Services
{
    public class ChatService: IChatService
    {
        private readonly IMongoRepository<Messages> _messagesRepository;

        public ChatService(IMongoRepository<Messages> messagesRepository)
        {
            _messagesRepository = messagesRepository;
        }

        public void Save(ChatMessage message)
        {
            var newMessage = new Messages
            {
                GroupId = message.GroupName,
                Message = message.Message,
                CreatedAt = message.CreatedAt,
                User = new UserProfileEmbedMessage
                {
                    Id = message.UserId,
                    Name = message.Name,
                    Picture = message.Picture
                }
            };
            
            _messagesRepository.InsertOne(newMessage);
        }

        public IEnumerable<MessagesDto> GetAllFromGroup(string groupId, string userId)
        {
            var messages = _messagesRepository.FilterBy(x => x.GroupId == groupId).ToList();

            if (!messages.Any())
            {
                return new List<MessagesDto>();
            }
            
            return messages.Select(x => new MessagesDto
            {
                Message = x.Message,
                User = x.User,
                CreatedAt = x.CreatedAt,
                GroupId = x.GroupId,
                isMine = CheckSender(x, userId)
            });
        }
        
        private bool CheckSender(Messages message, string userId)
        {
            return message.User.Id == userId;
        }
    }
}