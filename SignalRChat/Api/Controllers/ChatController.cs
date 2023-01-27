using Api.Hubs;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _chatHub;
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService, IHubContext<ChatHub> chatHub)
        {
            _chatService = chatService;
            _chatHub = chatHub;
        }

        [HttpGet("GetNotification")]
        public async Task<IActionResult> GetNotification()
        {
            await _chatService.GetNotification();

            return Ok();
        }
    }
}
