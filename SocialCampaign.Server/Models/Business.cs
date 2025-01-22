using System;
using System.ComponentModel.DataAnnotations;

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
        [MaxLength(255)]
        public string Address { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
