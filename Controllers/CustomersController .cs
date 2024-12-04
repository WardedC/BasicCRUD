using Microsoft.AspNetCore.Mvc;
using WebApiCRUD.Data;
using WebApiCRUD.Models;

namespace WebApiCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        // Obtener todos los clientes
        [HttpGet]
        public IActionResult GetAll()
        {
            var customers = _context.Customers.ToList();
            return Ok(customers);
        }

        // Agregar un cliente
        [HttpPost]
        public IActionResult Add([FromBody] Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return Ok("Cliente añadido exitosamente.");
        }

        // Actualizar un cliente
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Customer updatedCustomer)
        {
            var customer = _context.Customers.Find(id);
            if (customer == null)
                return NotFound("Cliente no encontrado.");

            customer.FirstName = updatedCustomer.FirstName;
            customer.LastName = updatedCustomer.LastName;
            customer.Email = updatedCustomer.Email;
            customer.PhoneNumber = updatedCustomer.PhoneNumber;
            customer.Address = updatedCustomer.Address;
            customer.City = updatedCustomer.City;
            customer.PostalCode = updatedCustomer.PostalCode;
            customer.DateOfBirth = updatedCustomer.DateOfBirth;

            _context.SaveChanges();
            return Ok("Cliente actualizado.");
        }

        // Eliminar un cliente
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var customer = _context.Customers.Find(id);
            if (customer == null)
                return NotFound("Cliente no encontrado.");

            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return Ok("Cliente eliminado.");
        }
    }
}
