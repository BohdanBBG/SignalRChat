using Api.Models;
using Api.Models.Domain;
using Api.Models.Dto;

namespace Api.Services.Interfaces
{
    public interface IAuthService
    {
        Task<TokenModel?> Authenticate(LoginDto model);
    }
}
