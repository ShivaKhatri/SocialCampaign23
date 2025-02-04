using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialCampaign.Server.Models;

[Route("api/[controller]")]
[ApiController]
public class BusinessAdsController : ControllerBase
{
    private readonly DatabaseConnection _context;

    public BusinessAdsController(DatabaseConnection context)
    {
        _context = context;
    }

    // GET: api/BusinessAds (Returns only non-deleted ads)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BusinessAd>>> GetBusinessAds()
    {
        return await _context.BusinessAds
            .Where(ad => !ad.IsDeleted)
            .ToListAsync();
    }

    // GET: api/BusinessAds/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<BusinessAd>> GetBusinessAd(int id)
    {
        var businessAd = await _context.BusinessAds
            .Where(ad => ad.BusinessAdId == id && !ad.IsDeleted)
            .FirstOrDefaultAsync();

        return businessAd == null ? NotFound(new { message = "Ad not found." }) : Ok(businessAd);
    }

    // GET: api/BusinessAds/business/{businessId}
    [HttpGet("business/{businessId}")]
    public async Task<ActionResult<IEnumerable<BusinessAd>>> GetAdsByBusinessId(int businessId)
    {
        var ads = await _context.BusinessAds
            .Where(ad => ad.BusinessId == businessId && !ad.IsDeleted)
            .ToListAsync();

        return ads.Count == 0 ? Ok(new List<BusinessAd>()) : Ok(ads);
    }

    // POST: api/BusinessAds (Creates a new ad with image upload)
    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<BusinessAd>> PostBusinessAd()
    {
        var formData = Request.Form;

        if (!formData.ContainsKey("BusinessId") || !int.TryParse(formData["BusinessId"], out int businessId) ||
            string.IsNullOrWhiteSpace(formData["Title"]) ||
            string.IsNullOrWhiteSpace(formData["Description"]))
        {
            return BadRequest(new { message = "Missing required fields." });
        }

        if (!await _context.Businesses.AnyAsync(b => b.BusinessId == businessId))
        {
            return NotFound(new { message = "Business not found." });
        }

        var newAd = new BusinessAd
        {
            BusinessId = businessId,
            Title = formData["Title"],
            Description = formData["Description"],
            CreatedAt = DateTime.UtcNow,
            IsDeleted = false,
            Status = "Pending", // Default status
            ImageUrl = null
        };

        if (Request.Form.Files.Count > 0)
        {
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "business_ads");
                Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                newAd.ImageUrl = $"/business_ads/{uniqueFileName}";
            }
        }

        _context.BusinessAds.Add(newAd);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBusinessAd), new { id = newAd.BusinessAdId }, newAd);
    }

    // PATCH: api/BusinessAds/{id}/status (Updates only the status of an ad)
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateAdStatus(int id, [FromBody] Dictionary<string, string> statusUpdate)
    {
        Console.WriteLine($"[DEBUG] Received PATCH request for BusinessAd ID: {id}");

        var ad = await _context.BusinessAds.FindAsync(id);
        if (ad == null)
        {
            Console.WriteLine("[ERROR] Ad not found.");
            return NotFound(new { message = "Ad not found." });
        }

        if (!statusUpdate.ContainsKey("status"))
        {
            Console.WriteLine("[ERROR] Missing status field in request.");
            return BadRequest(new { message = "Status is required." });
        }

        string newStatus = statusUpdate["status"];

        // Validate allowed statuses
        if (!new[] { "Pending", "Approved", "Rejected" }.Contains(newStatus))
        {
            Console.WriteLine($"[ERROR] Invalid status value received: {newStatus}");
            return BadRequest(new { message = "Invalid status value." });
        }

        Console.WriteLine($"[DEBUG] Updating status for BusinessAd ID {id} from '{ad.Status}' to '{newStatus}'");

        // Ensure only the status field is updated
        ad.Status = newStatus;
        _context.Entry(ad).Property(x => x.Status).IsModified = true; // Explicitly track only Status update

        await _context.SaveChangesAsync();

        Console.WriteLine($"[AFTER SAVE] BusinessAd - ID: {ad.BusinessAdId}, Title: {ad.Title}, Description: {ad.Description}, Status: {ad.Status}");

        return Ok(new { message = "Status updated successfully.", updatedStatus = ad.Status });
    }






    // DELETE: api/BusinessAds/{id} (Soft delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBusinessAd(int id)
    {
        var businessAd = await _context.BusinessAds.FindAsync(id);
        if (businessAd == null) return NotFound(new { message = "Ad not found." });

        businessAd.IsDeleted = true;
        businessAd.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Ad deleted successfully." });
    }
}
