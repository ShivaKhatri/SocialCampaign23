using Microsoft.EntityFrameworkCore;

namespace SocialCampaign.Server.Models
{
    public class DatabaseConnection : DbContext
    {
        public DatabaseConnection(DbContextOptions<DatabaseConnection> options) : base(options)
        {
        }

        // DbSets for models
        public DbSet<User> Users { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<CampaignLike> CampaignLikes { get; set; }
        public DbSet<BusinessAd> BusinessAds { get; set; }
        public DbSet<AdminApproval> AdminApprovals { get; set; }
        public DbSet<Business> Businesses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Further configuration if needed
        }
    }
}
