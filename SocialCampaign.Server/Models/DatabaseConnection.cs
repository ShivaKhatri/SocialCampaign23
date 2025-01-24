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
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<BusinessAd> BusinessAds { get; set; }
        public DbSet<CampaignLike> CampaignLikes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            // Campaign to Comments relationship (no navigation properties)
            modelBuilder.Entity<Comment>()
                .HasOne<Campaign>()
                .WithMany()
                .HasForeignKey(c => c.CampaignId)
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete for campaign

            // Self-referencing relationship for ParentCommentCommentId (Cascade delete)
            modelBuilder.Entity<Comment>()
                .HasOne<Comment>()
                .WithMany()
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Cascade);  // Cascade delete for parent comment

            // Self-referencing relationship for ParentCommentId (Restrict delete to avoid cycles)
            modelBuilder.Entity<Comment>()
                .HasOne<Comment>()
                .WithMany()
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Restrict);  // Restrict delete to avoid circular reference

            // Foreign key for UserId (Cascade delete)
            modelBuilder.Entity<Comment>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);


        }
}
}
