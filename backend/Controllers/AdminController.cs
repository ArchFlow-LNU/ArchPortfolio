using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;
using Microsoft.AspNetCore.Authorization;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")] 
    public class AdminsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminsController(AppDbContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            return await _context.Admins
                .Select(a => new
                {
                    a.Id,
                    a.Email,
                    a.Name,
                    a.Role,
                    a.CreatedAt
                })
                .ToListAsync();
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> Get(int id)
        {
            var admin = await _context.Admins
                .Where(a => a.Id == id)
                .Select(a => new
                {
                    a.Id,
                    a.Email,
                    a.Name,
                    a.Role,
                    a.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (admin == null)
                return NotFound();

            return admin;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateAdminDto dto)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
                return NotFound();

            admin.Email = dto.Email ?? admin.Email;
            admin.Name = dto.Name ?? admin.Name;
            admin.Role = dto.Role ?? admin.Role;

            await _context.SaveChangesAsync();

            return NoContent();
        }

      
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
                return NotFound();

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class UpdateAdminDto
    {
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
    }
}