using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialCampaign.Server.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Configuration; // Add this
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Logging;
namespace SocialCampaign.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseConnection _context;
        private readonly IConfiguration _configuration; // Inject IConfiguration
        private readonly ILogger<UsersController> _logger;
        // Constructor to inject DbContext and IConfiguration
        public UsersController(DatabaseConnection context, IConfiguration configuration, ILogger<UsersController> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]  // Restrict access to authenticated users
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                _logger.LogInformation("Fetching all users...");

                // ✅ Fetch users safely, handling potential NULL values
                var users = await _context.Users
                     .Select(user => new
                     {
                         user.UserId,
                         user.FirstName,
                         user.LastName,
                         user.Email,
                         user.UserType,
                         ProfilePicture = user.ProfilePicture != null ? user.ProfilePicture : "", // ✅ Handle NULL values before selection
                         user.CreatedAt
                     })
                     .ToListAsync();

                _logger.LogInformation("Successfully retrieved {Count} users", users.Count);

                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to fetch users." });
            }
        }


        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize]  // Restrict access to authenticated users
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        [Authorize]  // Restrict access to authenticated users
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<User>> PostUser()
        {
            try
            {
                var form = Request.Form;
                _logger.LogInformation($"Incoming Request Content-Type: {Request.ContentType}");

                // Log received form data
                _logger.LogInformation("Received Form Data Keys: {Keys}", string.Join(", ", form.Keys));

                string firstName = form["FirstName"].FirstOrDefault() ?? "";
                string lastName = form["LastName"].FirstOrDefault() ?? "";
                string email = form["Email"].FirstOrDefault() ?? "";
                string password = form["PasswordHash"].FirstOrDefault() ?? "";
                string userType = form["UserType"].FirstOrDefault() ?? "User";

                _logger.LogInformation($"FirstName: {firstName}, LastName: {lastName}, Email: {email}");

                // ✅ Validate required fields
                if (string.IsNullOrWhiteSpace(firstName) ||
                    string.IsNullOrWhiteSpace(lastName) ||
                    string.IsNullOrWhiteSpace(email) ||
                    string.IsNullOrWhiteSpace(password))
                {
                    _logger.LogWarning("Missing required fields in form data.");
                    return BadRequest(new { message = "All required fields must be provided." });
                }

                // ✅ Normalize email (lowercase for consistency)
                string emailStr = email.ToLower();

                // ✅ Ensure `emailStr` is a plain string before querying EF
                bool emailExists = _context.Users.Any(u => u.Email == emailStr);
                if (emailExists)
                {
                    _logger.LogWarning("Duplicate email found: {Email}", emailStr);
                    return Conflict(new { message = "A user with this email already exists." });
                }

                // ✅ Create user object (ProfilePicture will be set later if file exists)
                var user = new User
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Email = emailStr,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(password), // Hash password
                    CreatedAt = DateTime.UtcNow,
                    IsDeleted = false,
                    UserType = userType,
                    ProfilePicture = null // Will be updated if file is provided
                };

                // ✅ Handle ProfilePicture Upload
                if (Request.Form.Files.Count > 0)
                {
                    _logger.LogInformation("File detected in request...");

                    var profilePicture = Request.Form.Files["ProfilePicture"];

                    if (profilePicture != null && profilePicture.Length > 0)
                    {
                        try
                        {
                            // Define storage path
                            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "profile_pictures");

                            // Ensure directory exists
                            if (!Directory.Exists(uploadsFolder))
                            {
                                Directory.CreateDirectory(uploadsFolder);
                                _logger.LogInformation("Created uploads directory: {Path}", uploadsFolder);
                            }

                            // Create unique filename
                            string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(profilePicture.FileName)}";
                            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                            _logger.LogInformation("Saving file to: {Path}", filePath);

                            // Save the file
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await profilePicture.CopyToAsync(stream);
                            }

                            // ✅ Save relative file path in database (matches your model)
                            user.ProfilePicture = $"/profile_pictures/{uniqueFileName}";

                            _logger.LogInformation("Profile picture saved successfully: {FilePath}", user.ProfilePicture);
                        }
                        catch (Exception fileEx)
                        {
                            _logger.LogError(fileEx, "Error occurred while saving profile picture.");
                            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to upload profile picture." });
                        }
                    }
                }

                // ✅ Save user to database
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                _logger.LogInformation("User saved successfully with ID: {UserId}", user.UserId);

                // ✅ Return response excluding sensitive data
                return CreatedAtAction("GetUser", new { id = user.UserId }, new
                {
                    user.UserId,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.UserType,
                    user.ProfilePicture, // This now contains the saved file path
                    user.CreatedAt
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating user.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Internal server error: {ex.Message}" });
            }
        }




        // PUT: api/Users/{id}/upload-profile-picture
        [HttpPut("{id}/upload-profile-picture")]
        [Authorize]
        public async Task<IActionResult> UploadProfilePicture(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded." });
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            try
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "profile_pictures");

                // Create the directory if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Update user profile picture path
                user.ProfilePicture = $"/profile_pictures/{uniqueFileName}";
                await _context.SaveChangesAsync();

                _logger.LogInformation("Profile picture updated for User ID: {UserId}", user.UserId);

                var fileUrl = $"{Request.Scheme}://{Request.Host}{user.ProfilePicture}";
                return Ok(new { imageUrl = fileUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading profile picture.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to upload profile picture." });
            }
        }
        

            // DELETE: api/Users/5
            [HttpDelete("{id}")]
        [Authorize]  // Restrict access to authenticated users
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        // Login logic with JWT token generation
        [HttpPost("login")]
        [AllowAnonymous]  // Allow access to unauthenticated users (for login)
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return BadRequest(new { message = "Email and Password are required." });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            if (user.IsDeleted)
            {
                return Unauthorized(new { message = "Account is deactivated." });
            }

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]); // Access config here
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, user.UserType)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["JwtSettings:Issuer"], // Access config here
                Audience = _configuration["JwtSettings:Audience"], // Access config here
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return Ok(new
            {
                message = "Login successful.",
                userId = user.UserId,
                userType = user.UserType,
                email = user.Email,
                token = jwtToken
            });
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
