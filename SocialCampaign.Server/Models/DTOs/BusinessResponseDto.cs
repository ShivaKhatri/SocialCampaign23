// Models/DTOs/BusinessResponseDto.cs

using System;

namespace SocialCampaign.Server.Models.DTOs
{
    public class BusinessResponseDto
    {
        public int BusinessId { get; set; }

        public string BusinessName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public string ProfilePicture { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
