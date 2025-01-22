using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialCampaign.Server.Models
{
    public class BusinessAd
    {
        [Key]
        public int BusinessAdId { get; set; }

        [Required]
        public int BusinessId { get; set; }

        public int? CampaignId { get; set; } // opetional

        [Required]
        [MaxLength(500)]
        public string AdDescription { get; set; }

        [Required]
        public DateTime PromotedAt { get; set; }

        [Required]
        public string ImagePath { get; set; } // Path or URL for the advertisement image

   
    }
}