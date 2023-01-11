using Api.Hubs;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSignalR();
            builder.Services.AddCors();

            var app = builder.Build();

            app.UseRouting();

            app.UseCors(builder => {
                builder
                  .WithOrigins("http://localhost:8080")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ChatHub>("/chat");
            });

            app.MapGet("/", () => "Hello World!");

            app.Run();
        }
    }
}