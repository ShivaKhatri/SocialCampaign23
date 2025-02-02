using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialCampaign.Server.Models;
using BCrypt.Net; // For BCrypt hashing

namespace SocialCampaign.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessesController : ControllerBase
    {
        private readonly DatabaseConnection _context;

        public BusinessesController(DatabaseConnection context)
        {
            _context = context;
        }

        // GET: api/Businesses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Business>>> GetBusinesses()
        {
            return await _context.Businesses.ToListAsync();
        }

        // GET: api/Businesses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Business>> GetBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);

            if (business == null)
            {
                return NotFound(new { message = "Business not found." });
            }

            return Ok(business);
        }

        // POST: api/Businesses
        [HttpPost]
        public async Task<ActionResult<Business>> PostBusiness([FromBody] Business business)
        {
        

            

            // 3. Check for duplicate email
            if (_context.Businesses.Any(b => b.Email == business.Email))
            {
                Console.WriteLine("[DEBUG] Duplicate email found!");
                return Conflict(new { message = "A business with this email already exists." });
            }

            // 4. Hash the password
            // `PasswordHash` is currently storing plain text from the frontend
            // More logical to rename this field to `Password` in your model
            var plainTextPassword = business.PasswordHash;
            business.PasswordHash = BCrypt.Net.BCrypt.HashPassword(plainTextPassword);

            Console.WriteLine("[DEBUG] Password hashed successfully.");

            // 5. Additional fields
            business.CreatedAt = DateTime.UtcNow;
            business.IsDeleted = false;

            // 6. Save to the database
            try
            {
                _context.Businesses.Add(business);
                await _context.SaveChangesAsync();
                Console.WriteLine("[DEBUG] Business saved successfully in the database!");
            }
            catch (Exception ex)
            {
                // Catch any exceptions from EF Core / DB
                Console.WriteLine($"[ERROR] Saving business failed: {ex.Message}");
                // Optionally return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }

            // 7. Return a 201 Created response
            Console.WriteLine("[DEBUG] Returning CreatedAtAction response.");
            return CreatedAtAction(nameof(GetBusiness), new { id = business.BusinessId }, business);
        }

        // PUT: api/Businesses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusiness(int id, Business updatedBusiness)
        {
            if (id != updatedBusiness.BusinessId)
            {
                return BadRequest(new { message = "Business ID mismatch." });
            }

            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound(new { message = "Business not found." });
            }

            // Partial update
            if (!string.IsNullOrWhiteSpace(updatedBusiness.BusinessName))
                business.BusinessName = updatedBusiness.BusinessName;

            if (!string.IsNullOrWhiteSpace(updatedBusiness.Email))
            {
                if (_context.Businesses.Any(b => b.Email == updatedBusiness.Email && b.BusinessId != id))
                {
                    return Conflict(new { message = "Another business with this email already exists." });
                }
                business.Email = updatedBusiness.Email;
            }

            if (!string.IsNullOrWhiteSpace(updatedBusiness.Phone))
                business.Phone = updatedBusiness.Phone;

            if (!string.IsNullOrWhiteSpace(updatedBusiness.Address))
                business.Address = updatedBusiness.Address;

            if (!string.IsNullOrWhiteSpace(updatedBusiness.Description))
                business.Description = updatedBusiness.Description;

            // If the password is being updated:
            if (!string.IsNullOrWhiteSpace(updatedBusiness.PasswordHash))
            {
                var plainTextPassword = updatedBusiness.PasswordHash;
                business.PasswordHash = BCrypt.Net.BCrypt.HashPassword(plainTextPassword);
            }

            _context.Entry(business).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusinessExists(id))
                {
                    return NotFound(new { message = "Business not found." });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Businesses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound(new { message = "Business not found." });
            }

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusinessExists(int id)
        {
            return _context.Businesses.Any(e => e.BusinessId == id);
        }
    }
}
