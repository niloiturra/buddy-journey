namespace BuddyJourney.WebApi.Core.Model
{
    public interface IBuddyJourneyDatabaseSettings
    {
        public string BuddyJourneyCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}