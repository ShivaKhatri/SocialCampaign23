using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialCampaign.Server.Models
{
    public class CampaignLike
    {
        [Key]
        public int CampaignLikeId { get; set; }

        [ForeignKey("Campaign")]
        [Required]
        public int CampaignId { get; set; }

        [ForeignKey("User")]
        [Required]
        public int UserId { get; set; }

        [Required]
        public bool IsBusiness { get; set; } // True for Business, False for User

        [Required]
        public DateTime LikedAt { get; set; }


    }
}
