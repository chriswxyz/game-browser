using GameBrowser.Commands;
using GameBrowser.Remote;
using GameBrowser.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace GameBrowser.WebAPI
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
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app
                .UseDefaultFiles()
                .UseStaticFiles()
                .UseHttpsRedirection()
                .UseMvc()
                //.UseEndpoints(endpoints =>
                //{
                //    var ignoreThese = new[]
                //    {
                //        "api",
                //        "scripts",
                //        "favicon"
                //    }.StringJoin("|");
                //    endpoints.MapFallbackToFile($"{{*url:regex(^(?!{ignoreThese}).*$)}}", "index.html");
                //    endpoints.MapControllers();
                //})
                ;
        }
    }
}
