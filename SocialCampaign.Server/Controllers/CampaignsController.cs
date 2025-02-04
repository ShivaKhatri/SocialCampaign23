using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SocialCampaign.Server.Models;

namespace SocialCampaign.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        private readonly DatabaseConnection _context;
        private readonly ILogger<CampaignsController> _logger;

        public CampaignsController(DatabaseConnection context, ILogger<CampaignsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Campaigns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campaign>>> GetCampaigns()
        {
            _logger.LogInformation("Fetching all campaigns.");
            return await _context.Campaigns.ToListAsync();
        }

        // GET: api/Campaigns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Campaign>> GetCampaign(int id)
        {
            _logger.LogInformation("Fetching campaign with ID: {Id}", id);
            var campaign = await _context.Campaigns.FindAsync(id);

            if (campaign == null)
            {
                _logger.LogWarning("Campaign with ID: {Id} not found.", id);
                return NotFound();
            }

            return campaign;
        }
        // PATCH: api/Campaigns/{id}/status (Updates only the status of a campaign)
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateCampaignStatus(int id, [FromBody] Dictionary<string, string> statusUpdate)
        {
            Console.WriteLine($"[DEBUG] Received PATCH request for Campaign ID: {id}");

            var campaign = await _context.Campaigns.FindAsync(id);
            if (campaign == null)
            {
                Console.WriteLine("[ERROR] Campaign not found.");
                return NotFound(new { message = "Campaign not found." });
            }

            if (!statusUpdate.ContainsKey("status"))
            {
                Console.WriteLine("[ERROR] Missing status field in request.");
                return BadRequest(new { message = "Status is required." });
            }

            string newStatus = statusUpdate["status"];

            // Validate allowed statuses
            if (!new[] { "Pending", "Approved", "Rejected", "Deleted" }.Contains(newStatus))
            {
                Console.WriteLine($"[ERROR] Invalid status value received: {newStatus}");
                return BadRequest(new { message = "Invalid status value." });
            }

            Console.WriteLine($"[DEBUG] Updating status for Campaign ID {id} from '{campaign.Status}' to '{newStatus}'");

            // Ensure only the status field is updated
            campaign.Status = newStatus;
            _context.Entry(campaign).Property(x => x.Status).IsModified = true; // Explicitly track only Status update

            await _context.SaveChangesAsync();

            Console.WriteLine($"[AFTER SAVE] Campaign - ID: {campaign.CampaignId}, Title: {campaign.Title}, Status: {campaign.Status}");

            return Ok(new { message = "Status updated successfully.", updatedStatus = campaign.Status });
        }

        // PUT: api/Campaigns/5
        [HttpPut("{id}")]
        [AllowAnonymous]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutCampaign(int id)
        {
            _logger.LogInformation("PutCampaign endpoint hit for id {Id}.", id);

            try
            {
                // Retrieve the existing campaign from the database.
                var existingCampaign = await _context.Campaigns.FindAsync(id);
                if (existingCampaign == null)
                {
                    _logger.LogWarning("Campaign with id {Id} not found.", id);
                    return NotFound();
                }

                var formData = Request.Form;
                string title = formData["Title"].FirstOrDefault() ?? "";
                string description = formData["Description"].FirstOrDefault() ?? "";
                string startDateStr = formData["StartDate"].FirstOrDefault() ?? "";
                string endDateStr = formData["EndDate"].FirstOrDefault() ?? "";

                _logger.LogInformation("Received update data: Title: {Title}, Description: {Description}, StartDate: {StartDate}, EndDate: {EndDate}",
                    title, description, startDateStr, endDateStr);

                if (string.IsNullOrWhiteSpace(title) ||
                    string.IsNullOrWhiteSpace(description) ||
                    string.IsNullOrWhiteSpace(startDateStr) ||
                    string.IsNullOrWhiteSpace(endDateStr))
                {
                    _logger.LogWarning("Missing required fields in the campaign update data.");
                    return BadRequest(new { message = "All required fields must be provided." });
                }

                if (!DateTime.TryParse(startDateStr, out DateTime startDate))
                {
                    _logger.LogWarning("Invalid StartDate: {StartDateStr}", startDateStr);
                    return BadRequest(new { message = "Invalid StartDate." });
                }

                if (!DateTime.TryParse(endDateStr, out DateTime endDate))
                {
                    _logger.LogWarning("Invalid EndDate: {EndDateStr}", endDateStr);
                    return BadRequest(new { message = "Invalid EndDate." });
                }

                if (startDate >= endDate)
                {
                    _logger.LogWarning("StartDate {StartDate} is not before EndDate {EndDate}.", startDate, endDate);
                    return BadRequest(new { message = "StartDate must be before EndDate." });
                }

                // Update campaign fields.
                existingCampaign.Title = title;
                existingCampaign.Description = description;
                existingCampaign.StartDate = startDate;
                existingCampaign.EndDate = endDate;

                // Handle file upload if provided.
                if (Request.Form.Files.Count > 0)
                {
                    var campaignPicture = Request.Form.Files["CampaignPicture"];
                    if (campaignPicture != null && campaignPicture.Length > 0)
                    {
                        try
                        {
                            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "campaign_pictures");
                            if (!Directory.Exists(uploadsFolder))
                            {
                                Directory.CreateDirectory(uploadsFolder);
                                _logger.LogInformation("Created uploads directory at {UploadsFolder}", uploadsFolder);
                            }

                            string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(campaignPicture.FileName)}";
                            string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                            _logger.LogInformation("Saving campaign picture to {FilePath}", filePath);

                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await campaignPicture.CopyToAsync(stream);
                            }

                            existingCampaign.CampaignPicture = $"/campaign_pictures/{uniqueFileName}";
                            _logger.LogInformation("Campaign picture updated to {CampaignPicture}", existingCampaign.CampaignPicture);
                        }
                        catch (Exception fileEx)
                        {
                            _logger.LogError(fileEx, "Error uploading campaign picture.");
                            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to upload campaign picture." });
                        }
                    }
                }

                _context.Entry(existingCampaign).State = EntityState.Modified;
                _logger.LogInformation("Updating campaign with ID: {Id}", id);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Campaign updated successfully with ID: {CampaignId}", existingCampaign.CampaignId);
                return Ok(existingCampaign);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Concurrency error updating campaign with ID: {Id}", id);
                if (!_context.Campaigns.Any(e => e.CampaignId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating campaign.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Internal server error: {ex.Message}" });
            }
        }

        // GET: api/Campaigns/approved
        [HttpGet("approved")]
        public async Task<IActionResult> GetApprovedCampaigns()
        {
            var approvedCampaigns = await _context.Campaigns
                .Where(c => c.Status == "Approved")
                .ToListAsync();

            if (!approvedCampaigns.Any())
            {
                return NotFound(new { message = "No approved campaigns available." });
            }

            return Ok(approvedCampaigns);
        }

        [HttpPost]
        [AllowAnonymous]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Campaign>> PostCampaign()
        {
            _logger.LogInformation("PostCampaign endpoint hit.");

            try
            {
                var formData = Request.Form;

                // Retrieve campaign fields from form data
                string title = formData["Title"].FirstOrDefault() ?? "";
                string description = formData["Description"].FirstOrDefault() ?? "";
                string startDateStr = formData["StartDate"].FirstOrDefault() ?? "";
                string endDateStr = formData["EndDate"].FirstOrDefault() ?? "";
                string createdByIdStr = formData["createdById"].FirstOrDefault() ?? "";

                _logger.LogInformation("Received campaign data: Title: {Title}, Description: {Description}, StartDate: {StartDate}, EndDate: {EndDate}, CreatedById: {CreatedById}",
                    title, description, startDateStr, endDateStr, createdByIdStr);

                // Validate required fields
                if (string.IsNullOrWhiteSpace(title) ||
                    string.IsNullOrWhiteSpace(description) ||
                    string.IsNullOrWhiteSpace(startDateStr) ||
                    string.IsNullOrWhiteSpace(endDateStr) ||
                    string.IsNullOrWhiteSpace(createdByIdStr))
                {
                    _logger.LogWarning("Missing required fields in the campaign form data.");
                    return BadRequest(new { message = "All required fields must be provided." });
                }

                // Convert createdById from string to int
                if (!int.TryParse(createdByIdStr, out int createdById))
                {
                    _logger.LogWarning("Invalid CreatedById provided: {CreatedById}", createdByIdStr);
                    return BadRequest(new { message = "Invalid CreatedById." });
                }

                // Parse and validate dates
                if (!DateTime.TryParse(startDateStr, out DateTime startDate))
                {
                    _logger.LogWarning("Invalid StartDate: {StartDateStr}", startDateStr);
                    return BadRequest(new { message = "Invalid StartDate." });
                }

                if (!DateTime.TryParse(endDateStr, out DateTime endDate))
                {
                    _logger.LogWarning("Invalid EndDate: {EndDateStr}", endDateStr);
                    return BadRequest(new { message = "Invalid EndDate." });
                }

                if (startDate >= endDate)
                {
                    _logger.LogWarning("StartDate {StartDate} is not before EndDate {EndDate}.", startDate, endDate);
                    return BadRequest(new { message = "StartDate must be before EndDate." });
                }

                // Create campaign object. Set default values as needed.
                var campaign = new Campaign
                {
                    Title = title,
                    Description = description,
                    StartDate = startDate,
                    EndDate = endDate,
                    IsApproved = false, // Default value; adjust if necessary.
                    CreatedById = createdById,    // Use the user ID extracted from the form.
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    CampaignPicture = "" // Will be updated if a file is provided.
                };

                // Handle CampaignPicture upload if a file is provided
                if (Request.Form.Files.Count > 0)
                {
                    var campaignPicture = Request.Form.Files["CampaignPicture"];
                    if (campaignPicture != null && campaignPicture.Length > 0)
                    {
                        try
                        {
                            // Define the storage path
                            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "campaign_pictures");

                            // Ensure the directory exists
                            if (!Directory.Exists(uploadsFolder))
                            {
                                Directory.CreateDirectory(uploadsFolder);
                                _logger.LogInformation("Created uploads directory at {UploadsFolder}", uploadsFolder);
                            }

                            // Create a unique filename
                            string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(campaignPicture.FileName)}";
                            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                            _logger.LogInformation("Saving campaign picture to {FilePath}", filePath);

                            // Save the file
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await campaignPicture.CopyToAsync(stream);
                            }

                            // Save the relative file path in the database
                            campaign.CampaignPicture = $"/campaign_pictures/{uniqueFileName}";
                            _logger.LogInformation("Campaign picture saved at {CampaignPicture}", campaign.CampaignPicture);
                        }
                        catch (Exception fileEx)
                        {
                            _logger.LogError(fileEx, "Error uploading campaign picture.");
                            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to upload campaign picture." });
                        }
                    }
                }

                // Save the campaign to the database
                _context.Campaigns.Add(campaign);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Campaign created successfully with ID: {CampaignId}", campaign.CampaignId);

                return CreatedAtAction("GetCampaign", new { id = campaign.CampaignId }, campaign);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating campaign.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Internal server error: {ex.Message}" });
            }
        }




        // GET: api/Campaigns/bycreator/15
        [HttpGet("bycreator/{createdById}")]
        public async Task<ActionResult<IEnumerable<object>>> GetCampaignsByCreator(int createdById)
        {
            _logger.LogInformation("Fetching campaigns for creator ID: {CreatedById}", createdById);

            var campaigns = await _context.Campaigns
                .Where(c => c.CreatedById == createdById && !c.IsDeleted)
                .Select(c => new
                {
                    id = c.CampaignId,
                    image = string.IsNullOrWhiteSpace(c.CampaignPicture)
                                ? "https://placehold.co/400?text=No+Image"
                                : c.CampaignPicture,
                    title = c.Title,
                    description = c.Description,
                    startDate = c.StartDate.ToString("yyyy-MM-dd"),
                    endDate = c.EndDate.ToString("yyyy-MM-dd")
                })
                .ToListAsync();

            _logger.LogInformation("Found {Count} campaigns for creator ID: {CreatedById}", campaigns.Count, createdById);

            // Instead of returning NotFound when there are no campaigns,
            // return an empty array with a 200 OK response.
            return Ok(campaigns);
        }

        // DELETE: api/Campaigns/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteCampaign(int id)
{
    _logger.LogInformation("Attempting to delete campaign with ID: {Id}", id);
    var campaign = await _context.Campaigns.FindAsync(id);
    
    if (campaign == null)
    {
        _logger.LogWarning("Campaign with ID: {Id} not found for deletion.", id);
        return NotFound();
    }

    // Delete the image file associated with the campaign
    if (!string.IsNullOrEmpty(campaign.CampaignPicture))
    {
        try
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "campaign_pictures", campaign.CampaignPicture);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
                _logger.LogInformation("Deleted image: {Path}", imagePath);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError("Error deleting image: {Error}", ex.Message);
        }
    }

    _context.Campaigns.Remove(campaign);
    await _context.SaveChangesAsync();
    _logger.LogInformation("Campaign with ID: {Id} deleted successfully.", id);

    return NoContent();
}

     
    }
}
