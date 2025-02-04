using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialCampaign.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace SocialCampaign.Server.Controllers
{
    [Route("api/businesses")]
    [ApiController]
    [Authorize] // Requires authentication for all routes
    public class BusinessController : ControllerBase
    {
        private readonly DatabaseConnection _context;

        public BusinessController(DatabaseConnection context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all businesses created by the logged-in user
        /// </summary>
        [HttpGet("{userId}", Name = "GetUserBusinesses")]
        public async Task<IActionResult> GetUserBusinesses(int userId)
        {
            var loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if (loggedInUserId != userId)
            {
                return Unauthorized(new { message = "You are not authorized to view these businesses." });
            }

            var userExists = await _context.Users.AnyAsync(u => u.UserId == userId);
            if (!userExists)
            {
                return NotFound(new { message = "User not found." });
            }

            var businesses = await _context.Businesses
                .Where(b => b.userId == userId && !b.IsDeleted)
                .ToListAsync();

            return Ok(businesses);
        }

        /// <summary>
        /// Create a new business
        /// </summary>
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateBusiness()
        {
            try
            {
                var formData = Request.Form;

                // Retrieve business fields from form data
                string businessName = formData["BusinessName"].FirstOrDefault() ?? "";
                string address = formData["Address"].FirstOrDefault() ?? "";
                string phone = formData["Phone"].FirstOrDefault() ?? "";
                string email = formData["Email"].FirstOrDefault() ?? "";
                string description = formData["Description"].FirstOrDefault() ?? "";

                // Validate required fields
                if (string.IsNullOrWhiteSpace(businessName) ||
                    string.IsNullOrWhiteSpace(address) ||
                    string.IsNullOrWhiteSpace(phone) ||
                    string.IsNullOrWhiteSpace(email) ||
                    string.IsNullOrWhiteSpace(description))
                {
                    return BadRequest(new { message = "All required fields must be provided." });
                }

                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                var userExists = await _context.Users.AnyAsync(u => u.UserId == userId);
                if (!userExists)
                {
                    return NotFound(new { message = "User not found. Cannot create a business." });
                }

                var existingBusiness = await _context.Businesses
                    .FirstOrDefaultAsync(b => b.BusinessName == businessName && b.userId == userId);

                if (existingBusiness != null)
                {
                    return BadRequest(new { message = "You already have a business with this name." });
                }

                var business = new Business
                {
                    BusinessName = businessName,
                    Address = address,
                    Phone = phone,
                    Email = email,
                    Description = description,
                    userId = userId,
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false
                };

                _context.Businesses.Add(business);
                await _context.SaveChangesAsync();

                return CreatedAtRoute("GetUserBusinesses", new { userId = business.userId }, business);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error.", error = ex.Message });
            }
        }

        /// <summary>
        /// Get a single business by ID (Only owner can access)
        /// </summary>
        [HttpGet("business/{id}")]
        public async Task<IActionResult> GetBusinessById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var business = await _context.Businesses
                .FirstOrDefaultAsync(b => b.BusinessId == id && b.userId == userId && !b.IsDeleted);

            if (business == null)
            {
                return NotFound(new { message = "Business not found or does not belong to you." });
            }

            return Ok(business);
        }

        /// <summary>
        /// Update an existing business (Only owner can update)
        /// </summary>
        [HttpPut("business/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateBusiness(int id)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var business = await _context.Businesses
                    .FirstOrDefaultAsync(b => b.BusinessId == id && b.userId == userId && !b.IsDeleted);

                if (business == null)
                {
                    return NotFound(new { message = "Business not found or does not belong to you." });
                }

                var formData = Request.Form;

                string businessName = formData["BusinessName"].FirstOrDefault() ?? "";
                string address = formData["Address"].FirstOrDefault() ?? "";
                string phone = formData["Phone"].FirstOrDefault() ?? "";
                string email = formData["Email"].FirstOrDefault() ?? "";
                string description = formData["Description"].FirstOrDefault() ?? "";

                if (string.IsNullOrWhiteSpace(businessName) || businessName.Length > 100)
                    return BadRequest(new { message = "Invalid Business Name (max 100 characters)." });

                if (string.IsNullOrWhiteSpace(address) || address.Length > 200)
                    return BadRequest(new { message = "Invalid Address (max 200 characters)." });

                if (!new EmailAddressAttribute().IsValid(email))
                    return BadRequest(new { message = "Invalid Email format." });

                if (!new PhoneAttribute().IsValid(phone))
                    return BadRequest(new { message = "Invalid Phone format." });

                if (string.IsNullOrWhiteSpace(description) || description.Length > 500)
                    return BadRequest(new { message = "Invalid Description (max 500 characters)." });

                business.BusinessName = businessName;
                business.Address = address;
                business.Phone = phone;
                business.Email = email;
                business.Description = description;

                _context.Businesses.Update(business);
                await _context.SaveChangesAsync();

                return Ok(business);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error.", error = ex.Message });
            }
        }

        /// <summary>
        /// Soft delete a business (Only owner can delete)
        /// </summary>
        [HttpDelete("business/{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var business = await _context.Businesses
                .FirstOrDefaultAsync(b => b.BusinessId == id && b.userId == userId && !b.IsDeleted);

            if (business == null)
            {
                return NotFound(new { message = "Business not found or does not belong to you." });
            }

            business.IsDeleted = true;
            business.DeletedAt = DateTime.UtcNow;

            _context.Businesses.Update(business);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Business deleted successfully." });
        }
    }
}
