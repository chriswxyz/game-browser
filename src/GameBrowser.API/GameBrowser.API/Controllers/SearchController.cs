using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameBrowser.Commands;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GameBrowser.API.Controllers
{
    [ApiController]
    [Route("/api/v1/search")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<SearchController> _logger;
        private readonly ISearchCommands searchCommands;

        public SearchController(
            ILogger<SearchController> logger,
            ISearchCommands searchCommands
            )
        {
            _logger = logger;
            this.searchCommands = searchCommands;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]string term)
        {
            var res = await searchCommands.Search(term);
            return Ok(res);
        }
    }
}
