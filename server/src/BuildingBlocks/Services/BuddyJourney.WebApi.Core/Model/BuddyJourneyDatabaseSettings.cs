namespace BuddyJourney.WebApi.Core.Model
{
    public class BuddyJourneyDatabaseSettings: IBuddyJourneyDatabaseSettings
    {
        public string BuddyJourneyCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }

        public string ConnectionStringWithDatabaseName() => string.Concat(ConnectionString, "/", DatabaseName);
    }
}