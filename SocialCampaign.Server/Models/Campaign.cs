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
        [MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public bool IsApproved { get; set; }

        [ForeignKey("ApprovedBy")]
        public int? ApprovedById { get; set; } // Nullable; approved by admin

        [ForeignKey("CreatedBy")]
        [Required]
        public int CreatedById { get; set; } // User or Business who created the campaign

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        [Required]
        public bool IsDeleted { get; set; }


    }
}
