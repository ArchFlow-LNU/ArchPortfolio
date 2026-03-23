using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
var builder = WebApplication.CreateBuilder(args); 
// DB
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); 
// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Controllers
builder.Services.AddControllers(); 
var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ArchPortfolio API V1");
    c.RoutePrefix = string.Empty; // щоб UI відкривався просто за http://localhost:5000/
});

// Routing 
app.UseRouting(); 

// МАПІНГ КОНТРОЛЕРІВ (ГОЛОВНЕ)
app.MapControllers(); 

app.Run();