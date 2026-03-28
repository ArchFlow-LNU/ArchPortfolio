using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArchPortfolio.Data;
using ArchPortfolio.Models;

namespace ArchPortfolio.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactInfoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactInfoController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<ContactInfo>> Get()
        {
            var contact = await _context.ContactInfos.FirstOrDefaultAsync();

            if (contact == null)
                return NotFound();

            return Ok(contact);
        }

        
        [HttpPost]
        public async Task<ActionResult<ContactInfo>> Create(ContactInfo contact)
        {
            _context.ContactInfos.Add(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ContactInfo updated)
        {
            if (id != updated.Id)
                return BadRequest();

            var contact = await _context.ContactInfos.FindAsync(id);

            if (contact == null)
                return NotFound();

            contact.Phone = updated.Phone;
            contact.Email = updated.Email;
            contact.Address = updated.Address;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var contact = await _context.ContactInfos.FindAsync(id);

            if (contact == null)
                return NotFound();

            _context.ContactInfos.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}