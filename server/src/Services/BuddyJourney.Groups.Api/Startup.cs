using BuddyJourney.Groups.Api.Configuration;
using BuddyJourney.WebApi.Core.Configuration.Auth;
using BuddyJourney.WebApi.Core.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace BuddyJourney.Groups.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostEnvironment hostEnvironment)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(hostEnvironment.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{hostEnvironment.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables();

            if (hostEnvironment.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            Configuration = builder.Build();
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IBuddyJourneyDatabaseSettings>(serviceProvider =>
                serviceProvider.GetRequiredService<IOptions<BuddyJourneyDatabaseSettings>>().Value);

            services.AddOptions();
            services.Configure<AzureBlobStorageSettings>(Configuration.GetSection("AzureBlobStorageSettings"));
            
            services.AddApiConfiguration(Configuration);

            services.AddJwtConfiguration(Configuration);

            services.AddSwaggerConfiguration();
            
            services.RegisterServices();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwaggerConfiguration();

            app.UseApiConfiguration(env);
        }
    }
}