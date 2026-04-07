using Microsoft.AspNetCore.Mvc;
using ArchPortfolio.Data;
using ArchPortfolio.Models;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace ArchPortfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register([FromBody] LoginDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Invalid data");

            var existing = _context.Admins.FirstOrDefault(a => a.Email == dto.Email);

            if (existing != null)
                return BadRequest("User already exists");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var admin = new Admin
            {
                Email = dto.Email,
                PasswordHash = hashedPassword,
                Name = "Admin",
                Role = "Admin" // ОБОВʼЯЗКОВО
            };

            _context.Admins.Add(admin);
            _context.SaveChanges();

            var token = GenerateJwt(admin);

            return Ok(new
            {
                token,
                email = admin.Email,
                role = admin.Role
            });
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _context.Admins
                .FirstOrDefault(a => a.Email == dto.Email);

            if (user == null)
                return Unauthorized();

            //правильна перевірка bcrypt
            var isValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            if (!isValid)
                return Unauthorized();

            // нормальний JWT
            var token = GenerateJwt(user);
            //var token = "test";

            return Ok(new { token });
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
                return Unauthorized();

            var user = _context.Admins.FirstOrDefault(a => a.Id == int.Parse(userId));

            if (user == null)
                return NotFound();

            return Ok(new { email = user.Email });
        }

        private string GenerateJwt(Admin user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),

        //  ОЦЕ ТЕ, ЧОГО НЕ ВИСТАЧАЛО
        new Claim(ClaimTypes.Role, user.Role)
    };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginDto
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

    
}