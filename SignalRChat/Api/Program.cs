using Api.DbContexts;
using Api.Hubs;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSignalR();
            builder.Services.AddCors();
            builder.Services.AddControllers();

            builder.Services.AddDbContext<AuthContext>(options => options.UseSqlServer(""));

            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Account/Login");
                    options.AccessDeniedPath = new Microsoft.AspNetCore.Http.PathString("/Account/Login");
                });

            var app = builder.Build();

            app.UseRouting();

            app.UseCors(builder => {
                builder
                  .WithOrigins("http://localhost:5005")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapHub<NotificationHub>("/notification");
            });

            app.MapGet("/", () => "Hello World!");
            app.MapDefaultControllerRoute();

            app.Run();
        }
    }
}