using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialCampaign.Server.Models
{
    public class BusinessAd
    {
        [Key]
        public int BusinessAdId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [ForeignKey("Business")]
        [Required]
        public int BusinessId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
        // 🔹 New Status Column (Default: "Pending")
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Pending";  // Can be "Pending", "Approved", or "Rejected"


    }
}
