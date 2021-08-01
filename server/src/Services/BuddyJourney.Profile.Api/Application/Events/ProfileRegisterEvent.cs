using System;
using BuddyJourney.Core.Messages;

namespace BuddyJourney.Profile.Api.Application.Events
{
    public class ProfileRegisterEvent: Event
    {
        public string Name { get; private set; }

        public ProfileRegisterEvent(string name)
        {
            Name = name;
        }
    }
}