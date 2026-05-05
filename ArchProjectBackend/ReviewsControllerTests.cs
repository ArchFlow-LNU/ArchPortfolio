using Xunit;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Controllers;
using ArchPortfolio.Data;
using ArchPortfolio.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace ArchProjectBackend.Tests
{
    public class ReviewsControllerTests
    {
        private Review CreateTestReview(int id = 1)
        {
            return new Review
            {
                Id = id,
                AuthorName = "Test",
                Message = "Hello",
                Approved = false,
                CreatedAt = DateTime.UtcNow
            };
        }
        private AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb_" + Guid.NewGuid())
                .Options;

            return new AppDbContext(options);
        }

        // GET approved
        [Fact]
        public async Task GetApproved_ShouldReturnOnlyApproved()
        {
            var context = GetDbContext();

            context.Reviews.AddRange(
                new Review
                {
                    Id = 1,
                    Approved = true,
                    AuthorName = "A",
                    Message = "Ok"
                },
                new Review
                {
                    Id = 2,
                    Approved = false,
                    AuthorName = "B",
                    Message = "No"
                }
            );

            await context.SaveChangesAsync();

            var controller = new ReviewsController(context);

            var result = await controller.GetApproved();

            var reviews = result.Value;

            Assert.Single(reviews);
            Assert.True(reviews.First().Approved);
        }

        // GET by id
        [Fact]
        public async Task Get_ShouldReturnReview_WhenExists()
        {
            var context = GetDbContext();

            context.Reviews.Add(CreateTestReview(1));
            await context.SaveChangesAsync();

            var controller = new ReviewsController(context);

            var result = await controller.Get(1);

            Assert.NotNull(result.Value);
            Assert.Equal(1, result.Value.Id);
        }

        [Fact]
        public async Task Get_ShouldReturnNotFound_WhenNotExists()
        {
            var context = GetDbContext();
            var controller = new ReviewsController(context);

            var result = await controller.Get(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        // POST
        [Fact]
        public async Task Create_ShouldAddReview_AndSetDefaults()
        {
            var context = GetDbContext();
            var controller = new ReviewsController(context);

            var review = new Review
            {
                AuthorName = "Test",
                Message = "Hello"
            };

            var result = await controller.Create(review);

            var created = (result.Result as OkObjectResult)?.Value as Review;

            Assert.NotNull(created);
            Assert.False(created.Approved);
            Assert.NotEqual(default, created.CreatedAt);
        }

        // PUT update
        [Fact]
        public async Task Update_ShouldReturnBadRequest_WhenIdsMismatch()
        {
            var context = GetDbContext();
            var controller = new ReviewsController(context);

            var review = new Review { Id = 2 };

            var result = await controller.Update(1, review);

            Assert.IsType<BadRequestResult>(result);
        }

        // APPROVE
        [Fact]
        public async Task Approve_ShouldSetApprovedTrue()
        {
            var context = GetDbContext();

            context.Reviews.Add(CreateTestReview(1));
            await context.SaveChangesAsync();

            var controller = new ReviewsController(context);

            var result = await controller.Approve(1);

            var updated = await context.Reviews.FindAsync(1);

            Assert.True(updated.Approved);
        }

        [Fact]
        public async Task Approve_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ReviewsController(context);

            var result = await controller.Approve(999);

            Assert.IsType<NotFoundResult>(result);
        }

        //DELETE
        [Fact]
        public async Task Delete_ShouldRemoveReview()
        {
            var context = GetDbContext();

            context.Reviews.Add(CreateTestReview(1));
            await context.SaveChangesAsync();

            var controller = new ReviewsController(context);

            var result = await controller.Delete(1);

            var review = await context.Reviews.FindAsync(1);

            Assert.Null(review);
        }

        [Fact]
        public async Task Delete_ShouldReturnNotFound_WhenMissing()
        {
            var context = GetDbContext();
            var controller = new ReviewsController(context);

            var result = await controller.Delete(999);

            Assert.IsType<NotFoundResult>(result);
        }
    }
}