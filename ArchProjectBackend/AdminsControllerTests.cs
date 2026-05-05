using Xunit;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Controllers;
using ArchPortfolio.Data;
using ArchPortfolio.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Collections.Generic;

namespace ArchProjectBackend.Tests
{
    public class AdminsControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        //helper
        private Admin CreateAdmin(int id)
        {
            return new Admin
            {
                Id = id,
                Name = "Admin " + id,
                Email = $"admin{id}@mail.com",
                PasswordHash = "hash",
                CreatedAt = DateTime.UtcNow,
                Role = "Admin"
            };
        }

        // ================== GET ALL ==================
        [Fact]
        public async Task GetAll_ShouldReturnAllAdmins()
        {
            var context = GetDbContext();

            context.Admins.AddRange(
                CreateAdmin(1),
                CreateAdmin(2)
            );

            await context.SaveChangesAsync();

            var controller = new AdminsController(context);

            var result = await controller.GetAll();

            var admins = Assert.IsAssignableFrom<IEnumerable<object>>(result.Value);

            Assert.Equal(2, admins.Count());
        }

        // ================== GET BY ID ==================
        [Fact]
        public async Task Get_ShouldReturnAdmin_WhenExists()
        {
            var context = GetDbContext();

            context.Admins.Add(CreateAdmin(1));
            await context.SaveChangesAsync();

            var controller = new AdminsController(context);

            var result = await controller.Get(1);

            Assert.NotNull(result.Value);
        }

        [Fact]
        public async Task Get_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new AdminsController(context);

            var result = await controller.Get(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        // ================== UPDATE ==================
        [Fact]
        public async Task Update_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new AdminsController(context);

            var dto = new UpdateAdminDto
            {
                Name = "Updated"
            };

            var result = await controller.Update(1, dto);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ShouldUpdateAdmin_WhenValid()
        {
            var context = GetDbContext();

            context.Admins.Add(CreateAdmin(1));
            await context.SaveChangesAsync();

            var controller = new AdminsController(context);

            var dto = new UpdateAdminDto
            {
                Name = "Updated Name"
            };

            var result = await controller.Update(1, dto);

            Assert.IsType<NoContentResult>(result);
            Assert.Equal("Updated Name", context.Admins.First().Name);
        }

        // ================== DELETE ==================
        [Fact]
        public async Task Delete_ShouldRemoveAdmin()
        {
            var context = GetDbContext();

            context.Admins.Add(CreateAdmin(1));
            await context.SaveChangesAsync();

            var controller = new AdminsController(context);

            var result = await controller.Delete(1);

            Assert.Equal(0, context.Admins.Count());
        }

        [Fact]
        public async Task Delete_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new AdminsController(context);

            var result = await controller.Delete(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}