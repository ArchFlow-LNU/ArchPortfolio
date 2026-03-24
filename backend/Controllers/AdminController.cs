using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAll()
            => await _context.Admins.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> Get(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null) return NotFound();
            return admin;
        }

        [HttpPost]
        public async Task<ActionResult<Admin>> Create(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = admin.Id }, admin);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Admin admin)
        {
            if (id != admin.Id) return BadRequest();
            _context.Entry(admin).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null) return NotFound();
            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}