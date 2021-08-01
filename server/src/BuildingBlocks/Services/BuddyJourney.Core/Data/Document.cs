using System;
using System.Collections.Generic;
using BuddyJourney.Core.Messages;
using MongoDB.Bson;

namespace BuddyJourney.Core.Data
{
    public class Document : IDocument
    {
        public ObjectId Id { get; set; }
        public DateTime CreatedAt => Id.CreationTime;

        private List<Event> _notifications;
        public IReadOnlyCollection<Event> Notification => _notifications?.AsReadOnly();

        public void AddEvent(Event @event)
        {
            _notifications ??= new List<Event>();
            _notifications.Add(@event);
        }

        public void RemoveEvent(Event eventItem)
        {
            _notifications?.Remove(eventItem);
        }

        public void CleanEvent()
        {
            _notifications?.Clear();
        }
    }
}