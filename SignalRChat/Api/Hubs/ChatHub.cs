using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class ChatHub : Hub
    {
        [Authorize]
        public async Task Send(string message, string userName)
        {
            await Clients.AllExcept(new List<string> { Context.ConnectionId }).SendAsync("Send", message, userName);
        }

        [Authorize(Roles = "admin")]
        public async Task Notify(string message, string userName)
        {
            await Clients.All.SendAsync("Receive", message, userName);
        }
    }
}
