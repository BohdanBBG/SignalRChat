using Api.Models.Domain;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Api.DbContexts;
using Api.Models.Dto;
using Microsoft.EntityFrameworkCore;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Api
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly AuthContext _authContext;
        private readonly IAuthService _authService;
        public AccountController(AuthContext authContext, IAuthService authService)
        {
            _authContext = authContext;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var token = await _authService.Authenticate(model);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }

    }
}
