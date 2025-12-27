using Server.Models;

namespace Server.DAL.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
}
