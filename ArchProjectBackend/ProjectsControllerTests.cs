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
    public class ProjectsControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        //Category helper
        private ProjectCategory CreateCategory()
        {
            return new ProjectCategory
            {
                Id = 1,
                Name = "Test Category"
            };
        }

        //Project helper (ВСІ required поля!)
        private Project CreateProject(int id, bool isBest = false)
        {
            return new Project
            {
                Id = id,
                Title = "Test",
                Description = "Desc",
                FullDescription = "Full",
                Area = 100,
                Year = 2024,
                CategoryId = 1,
                IsBest = isBest,
                Images = new List<ProjectImage>()
            };
        }

        // ================== GET ALL ==================
        [Fact]
        public async Task GetAll_ShouldReturnAllProjects()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());

            context.Projects.AddRange(
                CreateProject(1),
                CreateProject(2)
            );

            await context.SaveChangesAsync();

            var controller = new ProjectsController(context);

            var result = await controller.GetAll();

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var projects = Assert.IsAssignableFrom<List<Project>>(ok.Value);

            Assert.Equal(2, projects.Count);
        }

        // ================== GET BY ID ==================
        [Fact]
        public async Task Get_ShouldReturnProject_WhenExists()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());
            context.Projects.Add(CreateProject(1));

            await context.SaveChangesAsync();

            var controller = new ProjectsController(context);

            var result = await controller.Get(1);

            var ok = Assert.IsType<OkObjectResult>(result.Result);
            var project = Assert.IsType<Project>(ok.Value);

            Assert.Equal(1, project.Id);
        }

        [Fact]
        public async Task Get_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ProjectsController(context);

            var result = await controller.Get(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        // ================== BEST ==================
        [Fact]
        public async Task GetBestProjects_ShouldReturnOnlyBest()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());

            context.Projects.AddRange(
                CreateProject(1, true),
                CreateProject(2, false)
            );

            await context.SaveChangesAsync();

            var controller = new ProjectsController(context);

            var result = await controller.GetBestProjects();

            var ok = Assert.IsType<OkObjectResult>(result);
            var projects = Assert.IsAssignableFrom<List<Project>>(ok.Value);

            Assert.Single(projects);
            Assert.True(projects.First().IsBest);
        }

        // ================== CREATE ==================
        [Fact]
        public async Task Create_ShouldAddProject()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());

            var controller = new ProjectsController(context);

            var project = CreateProject(1);

            var result = await controller.Create(project);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var created = Assert.IsType<Project>(createdResult.Value);

            Assert.Equal(1, context.Projects.Count());
            Assert.Equal("Test", created.Title);
        }

        // ================== UPDATE ==================
        [Fact]
        public async Task Update_ShouldReturnBadRequest_WhenIdsMismatch()
        {
            var context = GetDbContext();
            var controller = new ProjectsController(context);

            var project = CreateProject(2);

            var result = await controller.Update(1, project);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ShouldUpdateProject_WhenValid()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());
            context.Projects.Add(CreateProject(1));

            await context.SaveChangesAsync();

            // ❗ FIX tracking
            var existing = context.Projects.First();
            context.Entry(existing).State = EntityState.Detached;

            var controller = new ProjectsController(context);

            var updated = CreateProject(1);
            updated.Title = "Updated";

            var result = await controller.Update(1, updated);

            Assert.IsType<NoContentResult>(result);
            Assert.Equal("Updated", context.Projects.First().Title);
        }

        // ================== DELETE ==================
        [Fact]
        public async Task Delete_ShouldRemoveProject()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());
            context.Projects.Add(CreateProject(1));

            await context.SaveChangesAsync();

            var controller = new ProjectsController(context);

            var result = await controller.Delete(1);

            Assert.Equal(0, context.Projects.Count());
        }

        [Fact]
        public async Task Delete_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ProjectsController(context);

            var result = await controller.Delete(999);

            Assert.IsType<NotFoundResult>(result);
        }

        // ================== ADD IMAGE ==================
        [Fact]
        public async Task AddImage_ShouldAddImageToProject()
        {
            var context = GetDbContext();

            context.ProjectCategories.Add(CreateCategory());
            context.Projects.Add(CreateProject(1));

            await context.SaveChangesAsync();

            var controller = new ProjectsController(context);

            var dto = new ProjectsController.AddImageDto
            {
                ImageUrl = "test.jpg",
                IsMain = true
            };

            var result = await controller.AddImage(1, dto);

            Assert.Equal(1, context.ProjectImages.Count());
        }

        [Fact]
        public async Task AddImage_ShouldReturnNotFound_WhenProjectMissing()
        {
            var context = GetDbContext();
            var controller = new ProjectsController(context);

            var dto = new ProjectsController.AddImageDto
            {
                ImageUrl = "test.jpg"
            };

            var result = await controller.AddImage(999, dto);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}