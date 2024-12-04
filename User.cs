namespace BasicCRUD
{
    public class User
    {
        public int Id { get; set; } // ID �nico
        public string Email { get; set; } // Correo Electr�nico
        public string Password { get; set; } // Contrase�a
        public string? FullName { get; set; } // Nombre Completo
        public string? Role { get; set; } // Rol del usuario (Admin/User)
    }
}
