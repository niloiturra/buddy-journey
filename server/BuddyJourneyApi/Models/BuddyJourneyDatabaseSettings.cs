namespace BuddyJourneyApi.Models
{
    public class BuddyJourneyDatabaseSettings: IBuddyJourneyDatabaseSettings
    {
        public string BuddyJourneyCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}