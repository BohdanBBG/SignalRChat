using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class ChatHub: Hub
    {
        public async Task Send(string message, string userName)
        {
            await Clients.Others.SendAsync("Send", message, userName);
        }
    }
}
