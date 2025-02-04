using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialCampaign.Server.Migrations
{
    /// <inheritdoc />
    public partial class FixDeletedAtNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Ensure DeletedAt allows NULL values
            migrationBuilder.AlterColumn<DateTime>(
                name: "DeletedAt",
                table: "Businesses",
                type: "datetime2",
                nullable: true, // Make it nullable
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            // If PasswordHash is already deleted, remove this part
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DeletedAt",
                table: "Businesses",
                type: "datetime2",
                nullable: false, // Revert back to NOT NULL if rolling back
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }

    }
}
