using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
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

        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]

        public string PasswordHash { get; set; }
        public DateTime? DeletedAt { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

    }
}
