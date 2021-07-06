namespace BuddyJourneyApi.Models
{
    public interface IBuddyJourneyDatabaseSettings
    {
        string BuddyJourneyCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}