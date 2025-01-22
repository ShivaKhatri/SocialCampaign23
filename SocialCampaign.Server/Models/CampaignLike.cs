using System;
using System.ComponentModel.DataAnnotations;

namespace SocialCampaign.Server.Models
{
    public class CampaignLike
    {
        [Key]
        public int CampaignLikeId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int CampaignId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}