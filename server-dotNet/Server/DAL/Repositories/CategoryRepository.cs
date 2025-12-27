using Microsoft.EntityFrameworkCore;
using Server.DAL.Interfaces;
using Server.Data;
using Server.Models;

namespace Server.DAL.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _db;
    public CategoryRepository(AppDbContext db) => _db = db;

    public Task<List<Category>> GetAllAsync() =>
        _db.Categories.AsNoTracking().ToListAsync();
}
