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
        {
            var projects = await _context.Projects
                .Include(p => p.Category)
                .Include(p => p.Images)
                .ToListAsync();

            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> Get(int id)
        {
            var project = await _context.Projects
                .Include(p => p.Category)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null) return NotFound();

            return Ok(project);
        }

        [HttpGet("best")]
        public async Task<IActionResult> GetBestProjects()
        {
            var projects = await _context.Projects
                .Where(p => p.IsBest)
                .Include(p => p.Images)
                .ToListAsync();

            return Ok(projects);
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

        //==================IMAGES============================

        [HttpPost("{id}/images")]
        public async Task<IActionResult> AddImage(int id, [FromBody] AddImageDto dto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return NotFound();

            var image = new ProjectImage
            {
                ProjectId = id,
                ImageUrl = dto.ImageUrl,
                IsMain = dto.IsMain
            };

            _context.ProjectImages.Add(image);
            await _context.SaveChangesAsync();

            return Ok(image);
        }

        public class AddImageDto
        {
            public string ImageUrl { get; set; } = null!;
            public bool IsMain { get; set; } = false;
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetProject(int id)
        //{
        //    var project = await _context.Projects
        //        .Include(p => p.Images)
        //        .FirstOrDefaultAsync(p => p.Id == id);

        //    return Ok(project);
        //}
    }
}