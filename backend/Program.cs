using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using ArchPortfolio.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args); 
// DB
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); 
// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Controllers
//haendle circular references in JSON
//(наприклад, коли проект має категорію, а категорія має список проектів)
//without this, we might get "A possible object cycle was detected" error when serializing to JSON or CORS issues in frontend
//THATS WHY WE USE ReferenceHandler.IgnoreCycles - it tells the serializer to ignore circular references and not throw an error(29-33 STRING)
//LATER WE CAN IMPLEMENT SPECIAL MODELS TO AVOID THIS PROBLEM IN A BETTER WAY, BUT FOR NOW THIS IS A QUICK FIX!!!!!!!!
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };
    });

var app = builder.Build();


app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
    RequestPath = ""
});

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ArchPortfolio API V1");
    c.RoutePrefix = string.Empty; // щоб UI відкривався просто за http://localhost:5000/
});

// Routing 
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

// МАПІНГ КОНТРОЛЕРІВ (ГОЛОВНЕ)
app.MapControllers(); 

app.Run();