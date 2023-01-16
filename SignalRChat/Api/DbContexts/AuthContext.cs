using Api.Models.Domain;
using Api.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Api.DbContexts
{
    public class AuthContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public AuthContext(DbContextOptions<AuthContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            Role adminRole = new Role { Id = 1, Name = UserRoles.Admin };
            Role userRole = new Role { Id = 2, Name = UserRoles.User };

            User adminUser1 = new User { Id = 1, Email = "admin@mail.com", Password = "123456", RoleId = adminRole.Id };
            User adminUser2 = new User { Id = 2, Email = "tom@mail.com", Password = "123456", RoleId = adminRole.Id };
            User simpleUser1 = new User { Id = 3, Email = "bob@mail.com", Password = "123456", RoleId = userRole.Id };
            User simpleUser2 = new User { Id = 4, Email = "sam@mail.com", Password = "123456", RoleId = userRole.Id };

            modelBuilder.Entity<Role>().HasData(new Role[] { adminRole, userRole });
            modelBuilder.Entity<User>().HasData(new User[] { adminUser1, adminUser2, simpleUser1, simpleUser2 });

            base.OnModelCreating(modelBuilder);
        }
    }
}
