var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddDbContext<DatabaseConnection>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Add authentication services for JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                builder.Configuration["JwtSettings:SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey is missing")
            ))
        };
    });

// ✅ **Fix CORS Configuration**
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policyBuilder =>
    {
        policyBuilder.WithOrigins(
            "http://localhost:53328",  // Local development
            "https://purple-flower-091134b00.4.azurestaticapps.net"  // Azure frontend
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials(); // Required for authentication
    });
});

var app = builder.Build();

// ✅ **Apply CORS BEFORE authentication**
app.UseCors("AllowSpecificOrigins"); // Must be before authentication

// Serve static files (if you have any)
app.UseDefaultFiles();
app.UseStaticFiles();

// Enable Swagger for API documentation
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Enable authentication and authorization
app.UseAuthentication();  // Enable JWT authentication
app.UseAuthorization();   // Enable authorization

// Map controllers for API endpoints
app.MapControllers();

// Serve fallback file (for single-page apps like React)
app.MapFallbackToFile("/index.html");

app.Run();
