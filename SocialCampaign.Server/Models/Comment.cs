using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialCampaign.Server.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; }

        [ForeignKey("Campaign")]
        [Required]
        public int CampaignId { get; set; }

        [ForeignKey("User")]
        [Required]
        public int UserId { get; set; }

        [ForeignKey("ParentComment")]
        public int? ParentCommentId { get; set; } // For reply functionality

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

  
    }
}
