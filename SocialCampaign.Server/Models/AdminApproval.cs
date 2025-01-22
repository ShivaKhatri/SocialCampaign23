using System;
using System.ComponentModel.DataAnnotations;

namespace SocialCampaign.Server.Models
{
    public class AdminApproval
    {
        [Key]
        public int AdminApprovalId { get; set; }

        [Required]
        public int CampaignId { get; set; }

        [Required]
        public int AdminUserId { get; set; }

        [Required]
        public DateTime ApprovedAt { get; set; }

        [Required]
        public bool IsApproved { get; set; } // Approval or rejection flag
    }
}