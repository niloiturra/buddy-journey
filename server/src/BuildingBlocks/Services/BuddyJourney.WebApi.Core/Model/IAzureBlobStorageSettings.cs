namespace BuddyJourney.WebApi.Core.Model
{
    public interface IAzureBlobStorageSettings
    {
        public string AccessKey { get; set; }
        public string ContainerName { get; set; }
    }
}