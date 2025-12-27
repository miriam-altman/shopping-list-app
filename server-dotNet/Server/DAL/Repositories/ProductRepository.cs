using Microsoft.EntityFrameworkCore;
using Server.DAL.Interfaces;
using Server.Data;
using Server.Models;

namespace Server.DAL.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _db;
    public ProductRepository(AppDbContext db) => _db = db;

    public Task<List<Product>> GetAllAsync() =>
        _db.Products.AsNoTracking().ToListAsync();
}
