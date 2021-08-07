using System;
using MongoDB.Bson;

namespace BuddyJourney.Core.Messages.Integration
{
    public class UserRegisterIntegrationEvent: IntegrationEvent
    {
        public ObjectId Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }

        public UserRegisterIntegrationEvent(string id, string name, string email)
        {
            Id = ObjectId.Parse(id);
            Name = name;
            Email = email;
        }
    }
}