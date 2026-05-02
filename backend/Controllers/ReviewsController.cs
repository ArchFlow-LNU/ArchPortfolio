using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewsController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetApproved()
        {
            return await _context.Reviews
                .Where(r => r.Approved)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
public async Task<ActionResult<IEnumerable<Review>>> GetAllAdmin()
{
    return await _context.Reviews
        .Include(r => r.Project)
        .OrderByDescending(r => r.CreatedAt)
        .ToListAsync();
}

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> Get(int id)
        {
            var review = await _context.Reviews
                .Include(r => r.Project)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null) return NotFound();

            return review;
        }

        
        [HttpPost]
        public async Task<ActionResult<Review>> Create([FromBody] Review review)
        {
            review.Approved = false; 
            review.CreatedAt = DateTime.UtcNow;

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Review review)
        {
            if (id != review.Id) return BadRequest();

            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null) return NotFound();

            review.Approved = true;

            await _context.SaveChangesAsync();

            return Ok();
        }

      
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null) return NotFound();

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}