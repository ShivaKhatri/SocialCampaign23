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
    public class AdminApprovalsController : ControllerBase
    {
        private readonly DatabaseConnection _context;

        public AdminApprovalsController(DatabaseConnection context)
        {
            _context = context;
        }

        // GET: api/AdminApprovals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminApproval>>> GetAdminApprovals()
        {
            return await _context.AdminApprovals.ToListAsync();
        }

        // GET: api/AdminApprovals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminApproval>> GetAdminApproval(int id)
        {
            var adminApproval = await _context.AdminApprovals.FindAsync(id);

            if (adminApproval == null)
            {
                return NotFound();
            }

            return adminApproval;
        }

        // PUT: api/AdminApprovals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminApproval(int id, AdminApproval adminApproval)
        {
            if (id != adminApproval.AdminApprovalId)
            {
                return BadRequest();
            }

            _context.Entry(adminApproval).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminApprovalExists(id))
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

        // POST: api/AdminApprovals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdminApproval>> PostAdminApproval(AdminApproval adminApproval)
        {
            _context.AdminApprovals.Add(adminApproval);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdminApproval", new { id = adminApproval.AdminApprovalId }, adminApproval);
        }

        // DELETE: api/AdminApprovals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminApproval(int id)
        {
            var adminApproval = await _context.AdminApprovals.FindAsync(id);
            if (adminApproval == null)
            {
                return NotFound();
            }

            _context.AdminApprovals.Remove(adminApproval);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminApprovalExists(int id)
        {
            return _context.AdminApprovals.Any(e => e.AdminApprovalId == id);
        }
    }
}
