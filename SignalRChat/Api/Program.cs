using Api.DbContexts;
using Api.Hubs;
using Api.Models.Domain;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webBuilder = WebApplication.CreateBuilder(args);
            var appConfig = GetAppConfig();

            AddServices(webBuilder);
            AddAuthDb(appConfig);

            var app = webBuilder.Build();

            ConfigurePipline(app, appConfig);

            app.Run();
        }

        public static IConfigurationRoot GetAppConfig()
        {
            var configurationBuilder = new ConfigurationBuilder();

            configurationBuilder.SetBasePath(Directory.GetCurrentDirectory());
            configurationBuilder.AddJsonFile("appsettings.json");

            return configurationBuilder.Build();
        }

        public static void AddAuthDb(IConfigurationRoot appConfig)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AuthContext>();
            var options = optionsBuilder
                    .UseSqlServer(appConfig.GetConnectionString("DefaultConnection"))
                    .Options;

            using (AuthContext db = new AuthContext(options))
            {
                var users = db.Users.ToList();

                foreach (User u in users)
                {
                    Console.WriteLine($"{u.Id}.{u.Email} - {u.RoleId}");
                }
            }
        }

        public static void AddServices(WebApplicationBuilder builder)
        {
            builder.Services.AddSignalR();
            builder.Services.AddCors();
            builder.Services.AddControllers();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AuthContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            builder.Services.AddAuthorization();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = false,
                        ValidateIssuerSigningKey = true
                    };
                });


            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IChatService, ChatService>();
        }

        public static void ConfigurePipline(WebApplication app, IConfigurationRoot appConfig)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(options =>
                {
                    options.SerializeAsV2 = true;
                });
                app.UseSwaggerUI();
            }

            app.UseRouting();

            app.UseCors(builder => {
                builder
                  .WithOrigins("http://localhost:5005")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapHub<NotificationHub>("/notification");
            });

            app.MapGet("/", () => "Hello World!");
            app.MapDefaultControllerRoute();
        }
    }
}