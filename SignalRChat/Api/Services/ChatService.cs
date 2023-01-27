using Api.Hubs;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Services
{
    public class ChatService: IChatService
    {
        private readonly IHubContext<ChatHub> _chatHub;

        public ChatService(IHubContext<ChatHub> chatHub)
        {
            _chatHub = chatHub;
        }
        public async Task GetNotification()
        {
            await _chatHub.Clients.All.SendAsync("Notify", $"Добавлено:- {DateTime.Now.ToShortTimeString()}");
        }
    }
}
