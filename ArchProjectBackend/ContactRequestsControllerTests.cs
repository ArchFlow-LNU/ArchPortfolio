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
    public class ContactRequestsControllerTests
    {
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        //helper
        private ContactRequest CreateRequest(int id)
        {
            return new ContactRequest
            {
                Id = id,
                Name = "Test Name",        //required
                Email = "test@mail.com",  //required
                Phone = "123456789",
                Message = "Hello",
                ProjectType = "Web",
                CreatedAt = DateTime.UtcNow,
                Status = "new"
            };
        }

        // ================== GET ALL ==================
        [Fact]
        public async Task GetAll_ShouldReturnAllRequests()
        {
            var context = GetDbContext();

            context.ContactRequests.AddRange(
                CreateRequest(1),
                CreateRequest(2)
            );

            await context.SaveChangesAsync();

            var controller = new ContactRequestsController(context);

            var result = await controller.GetAll();

            var requests = Assert.IsAssignableFrom<List<ContactRequest>>(result.Value);

            Assert.Equal(2, requests.Count);
        }

        // ================== GET BY ID ==================
        [Fact]
        public async Task Get_ShouldReturnRequest_WhenExists()
        {
            var context = GetDbContext();

            context.ContactRequests.Add(CreateRequest(1));
            await context.SaveChangesAsync();

            var controller = new ContactRequestsController(context);

            var result = await controller.Get(1);

            var request = Assert.IsType<ContactRequest>(result.Value);

            Assert.Equal(1, request.Id);
        }

        [Fact]
        public async Task Get_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ContactRequestsController(context);

            var result = await controller.Get(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        // ================== CREATE ==================
        [Fact]
        public async Task Create_ShouldAddRequest()
        {
            var context = GetDbContext();
            var controller = new ContactRequestsController(context);

            var request = CreateRequest(1);

            var result = await controller.Create(request);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var created = Assert.IsType<ContactRequest>(createdResult.Value);

            Assert.Equal(1, context.ContactRequests.Count());
            Assert.Equal("Test Name", created.Name);
        }

        // ================== UPDATE ==================
        [Fact]
        public async Task Update_ShouldReturnBadRequest_WhenIdsMismatch()
        {
            var context = GetDbContext();
            var controller = new ContactRequestsController(context);

            var request = CreateRequest(2);

            var result = await controller.Update(1, request);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Update_ShouldUpdateRequest_WhenValid()
        {
            var context = GetDbContext();

            context.ContactRequests.Add(CreateRequest(1));
            await context.SaveChangesAsync();

            // ❗ FIX tracking
            var existing = context.ContactRequests.First();
            context.Entry(existing).State = EntityState.Detached;

            var controller = new ContactRequestsController(context);

            var updated = CreateRequest(1);
            updated.Message = "Updated message";

            var result = await controller.Update(1, updated);

            Assert.IsType<NoContentResult>(result);
            Assert.Equal("Updated message", context.ContactRequests.First().Message);
        }

        // ================== DELETE ==================
        [Fact]
        public async Task Delete_ShouldRemoveRequest()
        {
            var context = GetDbContext();

            context.ContactRequests.Add(CreateRequest(1));
            await context.SaveChangesAsync();

            var controller = new ContactRequestsController(context);

            var result = await controller.Delete(1);

            Assert.Equal(0, context.ContactRequests.Count());
        }

        [Fact]
        public async Task Delete_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ContactRequestsController(context);

            var result = await controller.Delete(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}