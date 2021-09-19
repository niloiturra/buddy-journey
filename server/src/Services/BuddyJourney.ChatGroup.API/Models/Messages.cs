using System;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Utils;

namespace BuddyJourney.ChatGroup.API.Models
{
    [BsonCollection("Messages")]
    public class Messages: Document
    {
        public string Message { get; set; }
        public string GroupId { get; set; }
        public new DateTime CreatedAt { get; set; }
        public UserProfileEmbedMessage User { get; set; }
    }
}