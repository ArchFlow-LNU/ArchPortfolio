using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AboutController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/about
        [HttpGet]
        public async Task<ActionResult<About>> Get()
        {
            var about = await _context.Abouts.FirstOrDefaultAsync();

            if (about == null)
                return NotFound();

            return Ok(about);
        }

        // POST api/about (??? ????????)
        [HttpPost]
        public async Task<ActionResult<About>> Create(About about)
        {
            _context.Abouts.Add(about);
            await _context.SaveChangesAsync();

            return Ok(about);
        }

        // PUT api/about/1 (???????)
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, About about)
        {
            if (id != about.Id)
                return BadRequest();

            _context.Entry(about).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}