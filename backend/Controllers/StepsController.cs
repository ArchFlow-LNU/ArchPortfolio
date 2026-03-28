using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StepsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Step>>> GetAll()
        {
            return Ok(await _context.Steps.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Step>> Create(Step step)
        {
            _context.Steps.Add(step);
            await _context.SaveChangesAsync();
            return Ok(step);
        }
    }
}