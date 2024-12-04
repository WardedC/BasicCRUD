namespace BasicCRUD
{
    public class Customer
    {
        public int Id { get; set; } // ID único del cliente
        public required string FirstName { get; set; } // Nombre
        public required string LastName { get; set; } // Apellido
        public required string Email { get; set; } // Correo Electrónico
        public required string PhoneNumber { get; set; } // Teléfono
        public required string Address { get; set; } // Dirección
        public required string City { get; set; } // Ciudad
        public required string PostalCode { get; set; } // Código Postal
        public DateTime DateOfBirth { get; set; } // Fecha de Nacimiento    }
    }
}
