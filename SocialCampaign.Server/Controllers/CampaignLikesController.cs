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
    public class CampaignLikesController : ControllerBase
    {
        private readonly DatabaseConnection _context;

        public CampaignLikesController(DatabaseConnection context)
        {
            _context = context;
        }

        // GET: api/CampaignLikes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampaignLike>>> GetCampaignLikes()
        {
            return await _context.CampaignLikes.ToListAsync();
        }

        // GET: api/CampaignLikes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CampaignLike>> GetCampaignLike(int id)
        {
            var campaignLike = await _context.CampaignLikes.FindAsync(id);

            if (campaignLike == null)
            {
                return NotFound();
            }

            return campaignLike;
        }

        // PUT: api/CampaignLikes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaignLike(int id, CampaignLike campaignLike)
        {
            if (id != campaignLike.CampaignLikeId)
            {
                return BadRequest();
            }

            _context.Entry(campaignLike).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignLikeExists(id))
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

        // POST: api/CampaignLikes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CampaignLike>> PostCampaignLike(CampaignLike campaignLike)
        {
            _context.CampaignLikes.Add(campaignLike);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaignLike", new { id = campaignLike.CampaignLikeId }, campaignLike);
        }

        // DELETE: api/CampaignLikes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaignLike(int id)
        {
            var campaignLike = await _context.CampaignLikes.FindAsync(id);
            if (campaignLike == null)
            {
                return NotFound();
            }

            _context.CampaignLikes.Remove(campaignLike);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampaignLikeExists(int id)
        {
            return _context.CampaignLikes.Any(e => e.CampaignLikeId == id);
        }
    }
}
