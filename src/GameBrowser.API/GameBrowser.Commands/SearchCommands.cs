using GameBrowser.Remote;
using GameBrowser.Shared;
using System.Linq;
using System.Threading.Tasks;

namespace GameBrowser.Commands
{
    public interface ISearchCommands
    {
        Task<GameResult[]> Search(string term);
    }

    public class SearchCommands : ISearchCommands
    {
        private readonly IIGDBRemote igdb;

        public SearchCommands(IIGDBRemote igdb)
        {
            this.igdb = igdb;
        }

        public async Task<GameResult[]> Search(string term)
        {
            if (term.IsNullOrWhiteSpace())
            {
                return new GameResult[0];
            }

            var gameContent = await igdb.SearchGames(term);
            var coverIds = gameContent.Where(x => x.Cover != null).Select(x => x.Cover).ToArray();
            var platformIds = gameContent.Where(x => x.Platforms != null).SelectMany(x => x.Platforms).Distinct().ToArray();
            var platformsTask = igdb.Platforms(platformIds);
            var gameCoversTask = igdb.Covers(coverIds);

            await Task.WhenAll(platformsTask, gameCoversTask);

            var platforms = await platformsTask;
            var gameCovers = await gameCoversTask;

            var results = gameContent
                .Join(
                    gameCovers,
                    game => game.Id,
                    cover => cover.Game,
                    (game, cover) => new GameResult
                    {
                        Id = game.Id,
                        Url = game.Url,
                        FirstReleaseDate = game.FirstReleaseDate,
                        Name = game.Name,
                        Slug = game.Slug,
                        Platforms = (game.Platforms ?? new string[0])
                            .Join(
                                platforms,
                                pId => pId,
                                plat => plat.Id,
                                (pId, plat) => plat.Name
                            )
                            .ToArray(),
                        Summary = game.Summary,
                        CoverId = cover.ImageId
                    }
                )
                .OrderBy(x => x.Name)
                .ToArray()
                ;

            return results;
        }
    }

    public class GameResult
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Slug { get; set; }
        public string CoverId { get; set; }
        public string FirstReleaseDate { get; set; }
        public string Url { get; set; }
        public string[] Platforms { get; set; }
    }


}
