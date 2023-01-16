using Api.Models.Enums;

namespace Api.Models.Domain
{
    public class Role
    {
        public Role()
        {
            Users = new List<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; }

    }
}
