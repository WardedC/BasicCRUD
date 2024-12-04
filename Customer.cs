namespace BasicCRUD
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; } // Nombre
        public string LastName { get; set; } // Apellido
        public string Email { get; set; } // Correo Electrónico
        public string PhoneNumber { get; set; } // Teléfono
        public string Address { get; set; } // Dirección
        public string City { get; set; } // Ciudad
        public string PostalCode { get; set; } // Código Postal
        public DateTime DateOfBirth { get; set; } // Fecha de Nacimiento
    }
}
