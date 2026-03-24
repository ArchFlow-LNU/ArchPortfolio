using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ContactRequestsController : ControllerBase
	{
		private readonly AppDbContext _context;
		public ContactRequestsController(AppDbContext context) => _context = context;

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ContactRequest>>> GetAll()
			=> await _context.ContactRequests.ToListAsync();

		[HttpGet("{id}")]
		public async Task<ActionResult<ContactRequest>> Get(int id)
		{
			var request = await _context.ContactRequests.FindAsync(id);
			if (request == null) return NotFound();
			return request;
		}

		[HttpPost]
		public async Task<ActionResult<ContactRequest>> Create(ContactRequest request)
		{
			_context.ContactRequests.Add(request);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(Get), new { id = request.Id }, request);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Update(int id, ContactRequest request)
		{
			if (id != request.Id) return BadRequest();
			_context.Entry(request).State = EntityState.Modified;
			await _context.SaveChangesAsync();
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var request = await _context.ContactRequests.FindAsync(id);
			if (request == null) return NotFound();
			_context.ContactRequests.Remove(request);
			await _context.SaveChangesAsync();
			return NoContent();
		}
	}
}