using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReviewsController : ControllerBase
	{
		private readonly AppDbContext _context;
		public ReviewsController(AppDbContext context) => _context = context;

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Review>>> GetAll()
			=> await _context.Reviews.Include(r => r.Project).ToListAsync();

		[HttpGet("{id}")]
		public async Task<ActionResult<Review>> Get(int id)
		{
			var review = await _context.Reviews.Include(r => r.Project)
											   .FirstOrDefaultAsync(r => r.Id == id);
			if (review == null) return NotFound();
			return review;
		}

		[HttpPost]
		public async Task<ActionResult<Review>> Create(Review review)
		{
			_context.Reviews.Add(review);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(Get), new { id = review.Id }, review);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Update(int id, Review review)
		{
			if (id != review.Id) return BadRequest();
			_context.Entry(review).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return NoContent();
		}

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