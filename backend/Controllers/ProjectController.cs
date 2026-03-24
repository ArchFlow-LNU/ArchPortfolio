using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProjectsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetAll()
            => await _context.Projects.Include(p => p.Category).ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Get(int id)
        {
            var project = await _context.Projects.Include(p => p.Category)
                                                 .FirstOrDefaultAsync(p => p.Id == id);
            if (project == null) return NotFound();
            return project;
        }

        [HttpPost]
        public async Task<ActionResult<Project>> Create(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Project project)
        {
            if (id != project.Id) return BadRequest();
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}