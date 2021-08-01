using System;
using BuddyJourney.Core.Data;
using BuddyJourney.Core.DomainObjects;
using BuddyJourney.Core.Utils;

namespace BuddyJourney.Profile.Api.Models
{
    [BsonCollection("profile")]
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

        public Profile(string name)
        {
            Name = name;
        }
    }
}