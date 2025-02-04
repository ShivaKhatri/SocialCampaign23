using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialCampaign.Server.Models
{
    public class Business
    {
        [Key]
        public int BusinessId { get; set; }

        [Required]
        [MaxLength(100)]
        public string BusinessName { get; set; }

        [Required]
        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [ForeignKey("User")]
        [Required]
        public int userId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public bool IsDeleted { get; set; }
    }
}
