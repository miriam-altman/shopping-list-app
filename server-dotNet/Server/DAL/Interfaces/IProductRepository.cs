using Server.Models;

namespace Server.DAL.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
}
