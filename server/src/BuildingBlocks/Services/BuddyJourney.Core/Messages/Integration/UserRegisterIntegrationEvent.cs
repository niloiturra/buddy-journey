using System;

namespace BuddyJourney.Core.Messages.Integration
{
    public class UserRegisterIntegrationEvent: IntegrationEvent
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }

        public UserRegisterIntegrationEvent(Guid id, string name, string email)
        {
            Id = id;
            Name = name;
            Email = email;
        }
    }
}