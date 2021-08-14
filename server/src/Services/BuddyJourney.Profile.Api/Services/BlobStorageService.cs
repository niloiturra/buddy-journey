using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using BuddyJourney.WebApi.Core.Interfaces;
using BuddyJourney.WebApi.Core.Model;
using Microsoft.Extensions.Options;

namespace BuddyJourney.Profile.Api.Services
{
    public class BlobStorageService : IBlobStorageService
    {
        private readonly AzureBlobStorageSettings _azureBlobStorageSettings;

        public BlobStorageService(IOptions<AzureBlobStorageSettings> azureBlobStorageSettings)
        {
            _azureBlobStorageSettings = azureBlobStorageSettings.Value;
        }

        public async Task<string> UploadBase64Image(string fileName, string base64Image)
        {
            var newFileName = GenerateFileName(fileName);
            var image = new Regex(@"^data:image\/[a-z]+;base64,").Replace(base64Image, "");
            var imageBytes = Convert.FromBase64String(image);

            var blobClient = new BlobClient(_azureBlobStorageSettings.AccessKey,
                _azureBlobStorageSettings.ContainerName, newFileName);

            await using var stream = new MemoryStream(imageBytes);
            await blobClient.UploadAsync(stream);

            return blobClient.Uri.AbsoluteUri;
        }

        private string GenerateFileName(string fileNameWithExtension)
        {
            var strName = fileNameWithExtension.Split('.');
            var strFileName = DateTime.Now.Day + DateTime.Now.Month + DateTime.Now.Year +
                              DateTime.Now.ToUniversalTime().ToString("yyyyMMdd\\THHmmssfff") + "." + strName[^1];

            return strFileName;
        }
    }
}