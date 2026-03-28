using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FAQController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FAQController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FAQ>>> Get()
        {
            var faqs = await _context.FAQs
                .OrderBy(f => f.Order)
                .ToListAsync();

            return Ok(faqs);
        }

        [HttpPost]
        public async Task<ActionResult<FAQ>> Create(FAQ faq)
        {
            _context.FAQs.Add(faq);
            await _context.SaveChangesAsync();

            return Ok(faq);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, FAQ faq)
        {
            if (id != faq.Id)
                return BadRequest("Id mismatch");

            var existing = await _context.FAQs.FindAsync(id);

            if (existing == null)
                return NotFound();

            // оновлюємо поля
            existing.Question = faq.Question;
            existing.Answer = faq.Answer;
            existing.Order = faq.Order;

            await _context.SaveChangesAsync();

            return NoContent();
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var faq = await _context.FAQs.FindAsync(id);

            if (faq == null)
                return NotFound();

            _context.FAQs.Remove(faq);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}