using BasicCRUD;
using Microsoft.EntityFrameworkCore;

namespace WebApiCRUD.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } // Tabla de usuarios
        public DbSet<Customer> Customers { get; set; } // Tabla de clientes
    }
}