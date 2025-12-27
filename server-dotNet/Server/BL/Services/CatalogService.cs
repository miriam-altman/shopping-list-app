using Server.BL.Interfaces;
using Server.DAL.Interfaces;
using Server.Models.Dtos;

namespace Server.BL.Services;

public class CatalogService : ICatalogService
{
    private readonly ICategoryRepository _categoryRepo;
    private readonly IProductRepository _productRepo;

    public CatalogService(ICategoryRepository categoryRepo, IProductRepository productRepo)
    {
        _categoryRepo = categoryRepo;
        _productRepo = productRepo;
    }

    public async Task<CatalogResponseDto> GetCatalogAsync()
    {
        var categories = await _categoryRepo.GetAllAsync();
        var products = await _productRepo.GetAllAsync();

        return new CatalogResponseDto
        {
            Categories = categories.Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name
            }).ToList(),

            Products = products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                CategoryId = p.CategoryId
            }).ToList()
        };
    }
}
