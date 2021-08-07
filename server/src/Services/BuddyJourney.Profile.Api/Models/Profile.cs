using System;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.Utils;
using MongoDB.Bson;

namespace BuddyJourney.Profile.Api.Models
{
    [BsonCollection("Profile")]
    public class Profile: Document
    {
        public UserEmbed User { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public DateTime BirthDay { get; set; }
        public string Location { get; set; }
        public string Biography { get; set; }
        public string BestTrip { get; set; }
        public object[] Notifications { get; set; }
        
        protected Profile() { }

        public Profile(ObjectId userId, string name, string email)
        {
            Name = name;
            User = new UserEmbed()
            {
                Email = email,
                Id = userId
            };
        }
    }
}