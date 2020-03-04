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
        private readonly ISearchCommands searchCommands;

        public SearchController(ISearchCommands searchCommands)
        {
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
