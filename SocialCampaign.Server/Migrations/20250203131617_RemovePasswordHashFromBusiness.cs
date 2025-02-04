using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialCampaign.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemovePasswordHashFromBusiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Remove the PasswordHash column from the Businesses table
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Businesses");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Add back the PasswordHash column if rolling back the migration
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
