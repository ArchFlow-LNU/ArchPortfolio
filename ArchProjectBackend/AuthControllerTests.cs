using ArchPortfolio.Controllers;
using ArchPortfolio.Data;
using ArchPortfolio.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Xunit;

namespace ArchProjectBackend.Tests
{
    public class AuthControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(System.Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        //fake config для JWT
        private IConfiguration GetConfig()
        {
            var dict = new Dictionary<string, string>
    {
        { "Jwt:Key", "THIS_IS_SUPER_SECRET_KEY_1234567890123456" }, 
        { "Jwt:Issuer", "test" },
        { "Jwt:Audience", "test" }
    };

            return new ConfigurationBuilder()
                .AddInMemoryCollection(dict)
                .Build();
        }

        private LoginDto CreateDto()
        {
            return new LoginDto
            {
                Email = "test@mail.com",
                Password = "123456"
            };
        }

        // ================= REGISTER =================

        [Fact]
        public void Register_ShouldCreateUser_AndReturnToken()
        {
            var context = GetDbContext();
            var config = GetConfig();
            var controller = new AuthController(context, config);

            var dto = CreateDto();

            var result = controller.Register(dto);

            var ok = Assert.IsType<OkObjectResult>(result);

            Assert.Equal(1, context.Admins.Count());
        }

        [Fact]
        public void Register_ShouldReturnBadRequest_WhenInvalidData()
        {
            var context = GetDbContext();
            var config = GetConfig();
            var controller = new AuthController(context, config);

            var dto = new LoginDto { Email = "", Password = "" };

            var result = controller.Register(dto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Register_ShouldReturnBadRequest_WhenUserExists()
        {
            var context = GetDbContext();
            var config = GetConfig();

            context.Admins.Add(new Admin
            {
                Email = "test@mail.com",
                PasswordHash = "hash",
                Name = "Admin",
                Role = "Admin"
            });
            context.SaveChanges();

            var controller = new AuthController(context, config);

            var dto = CreateDto();

            var result = controller.Register(dto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        // ================= LOGIN =================

        [Fact]
        public void Login_ShouldReturnToken_WhenValid()
        {
            var context = GetDbContext();
            var config = GetConfig();

            var password = "123456";
            var hash = BCrypt.Net.BCrypt.HashPassword(password);

            context.Admins.Add(new Admin
            {
                Email = "test@mail.com",
                PasswordHash = hash,
                Name = "Admin",
                Role = "Admin"
            });
            context.SaveChanges();

            var controller = new AuthController(context, config);

            var dto = new LoginDto
            {
                Email = "test@mail.com",
                Password = password
            };

            var result = controller.Login(dto);

            var ok = Assert.IsType<OkObjectResult>(result);

            Assert.NotNull(ok.Value);
        }

        [Fact]
        public void Login_ShouldReturnUnauthorized_WhenUserNotFound()
        {
            var context = GetDbContext();
            var config = GetConfig();

            var controller = new AuthController(context, config);

            var dto = CreateDto();

            var result = controller.Login(dto);

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public void Login_ShouldReturnUnauthorized_WhenWrongPassword()
        {
            var context = GetDbContext();
            var config = GetConfig();

            context.Admins.Add(new Admin
            {
                Email = "test@mail.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("correct"),
                Name = "Admin",
                Role = "Admin"
            });
            context.SaveChanges();

            var controller = new AuthController(context, config);

            var dto = new LoginDto
            {
                Email = "test@mail.com",
                Password = "wrong"
            };

            var result = controller.Login(dto);

            Assert.IsType<UnauthorizedResult>(result);
        }

        // ================= GET ME =================

        [Fact]
        public void GetMe_ShouldReturnUser_WhenAuthorized()
        {
            var context = GetDbContext();
            var config = GetConfig();

            var admin = new Admin
            {
                Id = 1,
                Email = "test@mail.com",
                PasswordHash = "hash",
                Name = "Admin",
                Role = "Admin"
            };

            context.Admins.Add(admin);
            context.SaveChanges();

            var controller = new AuthController(context, config);

            //підробляємо користувача
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "1")
            };

            var identity = new ClaimsIdentity(claims, "Test");
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(identity)
            };

            var result = controller.GetMe();

            var ok = Assert.IsType<OkObjectResult>(result);

            Assert.NotNull(ok.Value);
        }

        [Fact]
        public void GetMe_ShouldReturnUnauthorized_WhenNoUserId()
        {
            var context = GetDbContext();
            var config = GetConfig();

            var controller = new AuthController(context, config);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var result = controller.GetMe();

            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public void GetMe_ShouldReturnNotFound_WhenUserMissing()
        {
            var context = GetDbContext();
            var config = GetConfig();

            var controller = new AuthController(context, config);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "999")
            };

            var identity = new ClaimsIdentity(claims, "Test");
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(identity)
            };

            var result = controller.GetMe();

            Assert.IsType<NotFoundResult>(result);
        }
    }
}