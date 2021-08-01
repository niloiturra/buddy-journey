using System;
using System.Collections.Generic;
using BuddyJourney.Core.Messages;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BuddyJourney.Core.Data
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        ObjectId Id { get; set; }

        DateTime CreatedAt { get; }
        void AddEvent(Event @event);
        void RemoveEvent(Event eventItem);
        void CleanEvent();
    }
}