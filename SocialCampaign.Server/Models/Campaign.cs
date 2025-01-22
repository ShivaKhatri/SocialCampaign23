using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialCampaign.Server.Models
{
    public class Campaign
    {
        [Key]
        public int CampaignId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int CreatedById { get; set; }
        [Required]
        public bool Approved { get; set; } = false;
        [Required]
        public string ImagePath { get; set; } // Path or URL for the campaign image

    }
}