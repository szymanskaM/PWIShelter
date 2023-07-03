using AnimalShelter.Common.Model.Users;
using AnimalShelter.Services.Contract;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.API.Controllers
{
    [ApiController]
    [Route("/")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpPost]
        [Route("/api/user/log")]
        public async Task<IActionResult> CheckUser(CheckLog log)
        {
            return await _userService.CheckUser(log);
        }
        [HttpPost]
        [Route("/api/user")]
        public async Task<IActionResult> AddUser(CreateUserDto dto)
        {
            return await _userService.AddUser(dto);
        }
        [HttpPatch]
        [Route("/api/user")]
        public async Task<IActionResult> UpdateUser(UpdateUserDto dto)
        {
            return await _userService.UpdateUser(dto);
        }
        [HttpPatch]
        [Route("/api/user/pswd")]
        public async Task<IActionResult> UpdateUserPassword(UpdateUserDto dto)
        {
            return await _userService.UpdateUserPassword(dto);
        }
    }
}
