using Server.Models.Dtos;

namespace Server.BL.Interfaces;

public interface ICatalogService
{
    Task<CatalogResponseDto> GetCatalogAsync();
}
