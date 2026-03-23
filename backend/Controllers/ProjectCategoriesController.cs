using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;
// here we will implement CRUD operations for ProjectCategory entity
// GET /api/projectcategories - get all categories
// GET /api/projectcategories/{id} - get category by id
// POST /api/projectcategories - create new category
// PUT /api/projectcategories/{id} - update category
// DELETE /api/projectcategories/{id} - delete category

namespace ArchPortfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectCategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectCategoriesController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectCategory>>> GetAll()
        {
            return await _context.ProjectCategories.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectCategory>> GetById(int id)
        {
            var category = await _context.ProjectCategories.FindAsync(id);

            if (category == null)
                return NotFound();

            return category;
        }

        
        [HttpPost]
        public async Task<ActionResult<ProjectCategory>> Create(ProjectCategory category)
        {
            _context.ProjectCategories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProjectCategory category)
        {
            if (id != category.Id)
                return BadRequest();

            var existing = await _context.ProjectCategories.FindAsync(id);

            if (existing == null)
                return NotFound();

            existing.Name = category.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.ProjectCategories.FindAsync(id);

            if (category == null)
                return NotFound();

            _context.ProjectCategories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}