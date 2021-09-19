using System;
using System.ComponentModel.DataAnnotations;

namespace BuddyJourney.ChatGroup.API.Models
{
    public class ChatMessage
    {
        [Required] public string GroupName { get; set; }
        [Required] public string Message { get; set; }
        public string UserId { get; set; }
        [Required] public string Name { get; set; }
        [Required] public string Picture { get; set; }
        [Required] public DateTime CreatedAt { get; set; }
    }
}