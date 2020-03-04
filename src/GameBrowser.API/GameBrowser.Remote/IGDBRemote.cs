using GameBrowser.Shared;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace GameBrowser.Remote
{
    public interface IIGDBRemote
    {
        Task<IGDBGame[]> SearchGames(string term, int limit = 25, int offset = 0);
        Task<IGDBPlatform[]> Platforms(string[] platformIds);
        Task<IGDBCover[]> Covers(string[] coverIds);
    }

    public class IGDBRemote : IIGDBRemote
    {
        private readonly IHttpClientFactory httpFactory;
        private readonly EnvVars envVars;

        private static JsonSerializerSettings jsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            }
        };

        public IGDBRemote(IHttpClientFactory httpFactory, EnvVars envVars)
        {
            this.httpFactory = httpFactory;
            this.envVars = envVars;
        }

        public async Task<IGDBGame[]> SearchGames(string term, int limit = 10, int offset = 0)
        {
            using (var client = httpFactory.CreateClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var body = new[]
                {
                    $"search \"{term}\"",
                    $"fields id,name,platforms,slug,summary,url,first_release_date,cover,popularity",
                    $"limit {limit};",
                    $"offset {offset}"
                }.StringJoin(";");

                var searchContent = new StringContent(body);
                searchContent.Headers.Add("user-key", envVars.IGDBApiKey);
                var searchResult = await client.PostAsync($"{envVars.IGDBHost}/games/", searchContent);
                var searchResultString = await searchResult.Content.ReadAsStringAsync();
                var gameContent = JsonConvert.DeserializeObject<IGDBGame[]>(searchResultString, jsonSettings);
                return gameContent;
            }
        }

        public async Task<IGDBCover[]> Covers(string[] coverIds)
        {
            using (var client = httpFactory.CreateClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var coverIdsString = coverIds.StringJoin(",");
                var coversContent = new StringContent($"fields game,image_id; where id = ({coverIdsString});");
                coversContent.Headers.Add("user-key", envVars.IGDBApiKey);
                var coversResult = await client.PostAsync("https://api-v3.igdb.com/covers/", coversContent);
                var coversResultString = await coversResult.Content.ReadAsStringAsync();
                var gameCovers = JsonConvert.DeserializeObject<IGDBCover[]>(coversResultString, jsonSettings);
                return gameCovers;
            }
        }

        public async Task<IGDBPlatform[]> Platforms(string[] platformIds)
        {
            using (var client = httpFactory.CreateClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var platformIdsString = platformIds.StringJoin(",");
                var platformsContent = new StringContent($"fields id,name,category,platform_logo; where id = ({platformIdsString});");
                platformsContent.Headers.Add("user-key", envVars.IGDBApiKey);
                var platformsResult = await client.PostAsync("https://api-v3.igdb.com/platforms/", platformsContent);
                var platformsResultString = await platformsResult.Content.ReadAsStringAsync();
                var platforms = JsonConvert.DeserializeObject<IGDBPlatform[]>(platformsResultString, jsonSettings);
                return platforms;
            }
        }
    }

    public class IGDBGame
    {
        public string Id { get; set; }
        public string Cover { get; set; }
        public string FirstReleaseDate { get; set; }
        public string Name { get; set; }
        public string[] Platforms { get; set; }
        public string Slug { get; set; }
        public string Summary { get; set; }
        public string Url { get; set; }
    }

    public class IGDBPlatform
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public long Category { get; set; }
        public string PlatformLogo { get; set; }
    }

    public class IGDBCover
    {
        public string Game { get; set; }
        public string ImageId { get; set; }
    }
}
