using Microsoft.AspNetCore.Mvc;
using Server.BL.Interfaces;
using Server.Models.Dtos;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogController : ControllerBase
{
    private readonly ICatalogService _service;
    public CatalogController(ICatalogService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<CatalogResponseDto>> Get()
    {
        var catalog = await _service.GetCatalogAsync();
        return Ok(catalog);
    }
}
