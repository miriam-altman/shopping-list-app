namespace Server.Models.Dtos;

public class CatalogResponseDto
{
	public List<CategoryDto> Categories { get; set; } = new();
	public List<ProductDto> Products { get; set; } = new();
}
