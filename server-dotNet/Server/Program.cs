using Microsoft.EntityFrameworkCore;
using Server.BL.Interfaces;
using Server.BL.Services;
using Server.DAL.Interfaces;
using Server.DAL.Repositories;
using Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
    
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICatalogService, CatalogService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseRouting();
app.UseCors();
app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();


app.Run();