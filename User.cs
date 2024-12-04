namespace BasicCRUD
{
    public class User
    {
        public int Id { get; set; } // ID único
        public string Email { get; set; } // Correo Electrónico
        public string Password { get; set; } // Contraseña
        public string? FullName { get; set; } // Nombre Completo
        public string? Role { get; set; } // Rol del usuario (Admin/User)
    }
}
