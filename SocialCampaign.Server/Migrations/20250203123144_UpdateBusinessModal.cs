﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialCampaign.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBusinessModal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "Businesses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userId",
                table: "Businesses");
        }
    }
}
