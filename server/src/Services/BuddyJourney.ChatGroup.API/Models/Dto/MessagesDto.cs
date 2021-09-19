using System;
using BuddyJourney.Core.Data;

namespace BuddyJourney.ChatGroup.API.Models.Dto
{
    public class MessagesDto
    {
        public string Message { get; set; }
        public string GroupId { get; set; }
        public new DateTime CreatedAt { get; set; }
        public UserProfileEmbedMessage User { get; set; }
        public bool isMine { get; set; }
    }
}