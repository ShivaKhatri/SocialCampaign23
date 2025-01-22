using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialCampaign.Server.Models;

namespace SocialCampaign.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessAdsController : ControllerBase
    {
        private readonly DatabaseConnection _context;

        public BusinessAdsController(DatabaseConnection context)
        {
            _context = context;
        }

        // GET: api/BusinessAds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessAd>>> GetBusinessAds()
        {
            return await _context.BusinessAds.ToListAsync();
        }

        // GET: api/BusinessAds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessAd>> GetBusinessAd(int id)
        {
            var businessAd = await _context.BusinessAds.FindAsync(id);

            if (businessAd == null)
            {
                return NotFound();
            }

            return businessAd;
        }

        // PUT: api/BusinessAds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusinessAd(int id, BusinessAd businessAd)
        {
            if (id != businessAd.BusinessAdId)
            {
                return BadRequest();
            }

            _context.Entry(businessAd).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusinessAdExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BusinessAds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BusinessAd>> PostBusinessAd(BusinessAd businessAd)
        {
            _context.BusinessAds.Add(businessAd);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusinessAd", new { id = businessAd.BusinessAdId }, businessAd);
        }

        // DELETE: api/BusinessAds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessAd(int id)
        {
            var businessAd = await _context.BusinessAds.FindAsync(id);
            if (businessAd == null)
            {
                return NotFound();
            }

            _context.BusinessAds.Remove(businessAd);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BusinessAdExists(int id)
        {
            return _context.BusinessAds.Any(e => e.BusinessAdId == id);
        }
    }
}
