using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId);

        // Seed (נתוני דמו למטלה)
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "פירות" },
            new Category { Id = 2, Name = "ירקות" },
            new Category { Id = 3, Name = "מוצרי חלב" },
            new Category { Id = 4, Name = "בשרים" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "תפוח", CategoryId = 1 },
            new Product { Id = 2, Name = "בננה", CategoryId = 1 },
            new Product { Id = 3, Name = "תפוח אדמה", CategoryId = 2 },
            new Product { Id = 4, Name = "מלפפון", CategoryId = 2 },
            new Product { Id = 5, Name = "חלב", CategoryId = 3 },
            new Product { Id = 6, Name = "גבינה", CategoryId = 3 },
            new Product { Id = 7, Name = "עוף", CategoryId = 4 }
        );
    }
}


