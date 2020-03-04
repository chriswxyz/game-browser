using GameBrowser.Commands;
using GameBrowser.Remote;
using GameBrowser.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GameBrowser.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var envVars = Configuration.Get<EnvVars>();

            services
                .AddHttpClient()
                .AddControllers()
                ;

            // Remotes
            services
                .AddTransient<IIGDBRemote, IGDBRemote>()
                ;

            // Commands
            services
                .AddSingleton(envVars)
                .AddTransient<ISearchCommands, SearchCommands>()
                ;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseDefaultFiles()
                .UseStaticFiles()
                .UseRouting()
                .UseHttpsRedirection()
                .UseAuthorization()
                .UseEndpoints(endpoints =>
                {
                    var ignoreThese = new[]
                    {
                        "api",
                        "scripts",
                        "favicon"
                    }.StringJoin("|");
                    endpoints.MapFallbackToFile($"{{*url:regex(^(?!{ignoreThese}).*$)}}", "index.html");
                    endpoints.MapControllers();
                })
                ;
        }
    }
}
