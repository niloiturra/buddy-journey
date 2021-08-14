namespace BuddyJourney.WebApi.Core.Model
{
    public class AzureBlobStorageSettings: IAzureBlobStorageSettings
    {
        public string AccessKey { get; set; }
        public string ContainerName { get; set; }
    }
}