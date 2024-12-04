using Microsoft.AspNetCore.Mvc;
using WebApiCRUD.Data;
using WebApiCRUD.Models;

namespace WebApiCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginData)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == loginData.Email);

            if (user == null || user.Password != loginData.Password)
            {
                return Unauthorized("Correo o contraseña incorrectos.");
            }

            return Ok(new
            {
                Message = "Inicio de sesión exitoso",
                FullName = user.FullName,
                Role = user.Role
            });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            if (_context.Users.Any(u => u.Email == newUser.Email))
            {
                return BadRequest("El correo ya está en uso.");
            }

            _context.Users.Add(newUser);
            _context.SaveChanges();
            return Ok("Usuario registrado con éxito.");
        }
    }
}
