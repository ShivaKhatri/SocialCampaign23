using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialCampaign.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusToBusinessAd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "BusinessAds",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "BusinessAds");
        }
    }
}
