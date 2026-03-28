using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvantagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdvantagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advantage>>> GetAll()
        {
            return Ok(await _context.Advantages.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Advantage>> Create(Advantage adv)
        {
            _context.Advantages.Add(adv);
            await _context.SaveChangesAsync();
            return Ok(adv);
        }
    }
}