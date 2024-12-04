namespace BasicCRUD
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // En un entorno real, usa un hash para la contraseña
    }
}
