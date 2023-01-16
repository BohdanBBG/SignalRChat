using Api.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        readonly IHubContext<ChatHub> _chatHub;

        public ChatController(IHubContext<ChatHub> chatHub)
        {
            _chatHub = chatHub;
        }

        [HttpGet("GetNotification")]
        public async Task<IActionResult> GetNotification()
        {
            await _chatHub.Clients.All.SendAsync("Notify", $"Добавлено:- {DateTime.Now.ToShortTimeString()}");

            return Ok();
        }
    }
}
