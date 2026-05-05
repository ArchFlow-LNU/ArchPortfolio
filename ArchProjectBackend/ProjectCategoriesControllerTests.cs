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
    public class ProjectCategoriesControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        //helper
        private ProjectCategory CreateCategory(int id)
        {
            return new ProjectCategory
            {
                Id = id,
                Name = "Category " + id
            };
        }

        // ================== GET ALL ==================
        [Fact]
        public async Task GetAll_ShouldReturnAllCategories()
        {
            var context = GetDbContext();

            context.ProjectCategories.AddRange(
                CreateCategory(1),
                CreateCategory(2)
            );

            await context.SaveChangesAsync();

            var controller = new ProjectCategoriesController(context);

            var result = await controller.GetAll();

            var categories = Assert.IsAssignableFrom<List<ProjectCategory>>(result.Value);

            Assert.Equal(2, categories.Count);
        }

        // ================== GET BY ID ==================
        [Fact]
        public async Task GetById_ShouldReturnCategory_WhenExists()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory(1));
            await context.SaveChangesAsync();

            var controller = new ProjectCategoriesController(context);

            var result = await controller.GetById(1);

            var category = Assert.IsType<ProjectCategory>(result.Value);

            Assert.Equal(1, category.Id);
        }

        [Fact]
        public async Task GetById_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ProjectCategoriesController(context);

            var result = await controller.GetById(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        // ================== CREATE ==================
        [Fact]
        public async Task Create_ShouldAddCategory()
        {
            var context = GetDbContext();
            var controller = new ProjectCategoriesController(context);

            var category = CreateCategory(1);

            var result = await controller.Create(category);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var created = Assert.IsType<ProjectCategory>(createdResult.Value);

            Assert.Equal(1, context.ProjectCategories.Count());
            Assert.Equal("Category 1", created.Name);
        }

        // ================== UPDATE ==================
        [Fact]
        public async Task Update_ShouldReturnBadRequest_WhenIdsMismatch()
        {
            var context = GetDbContext();
            var controller = new ProjectCategoriesController(context);

            var category = CreateCategory(2);

            var result = await controller.Update(1, category);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ProjectCategoriesController(context);

            var category = CreateCategory(1);

            var result = await controller.Update(1, category);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ShouldUpdateCategory_WhenValid()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory(1));
            await context.SaveChangesAsync();

            var controller = new ProjectCategoriesController(context);

            var updated = new ProjectCategory
            {
                Id = 1,
                Name = "Updated"
            };

            var result = await controller.Update(1, updated);

            Assert.IsType<NoContentResult>(result);
            Assert.Equal("Updated", context.ProjectCategories.First().Name);
        }

        // ================== DELETE ==================
        [Fact]
        public async Task Delete_ShouldRemoveCategory()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory(1));
            await context.SaveChangesAsync();

            var controller = new ProjectCategoriesController(context);

            var result = await controller.Delete(1);

            Assert.Equal(0, context.ProjectCategories.Count());
        }

        [Fact]
        public async Task Delete_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ProjectCategoriesController(context);

            var result = await controller.Delete(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}