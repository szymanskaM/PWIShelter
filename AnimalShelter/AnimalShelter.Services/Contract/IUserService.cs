using AnimalShelter.Common.Model.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalShelter.Services.Contract
{
    public interface IUserService
    {
        Task<IActionResult> AddUser(CreateUserDto dto);
        Task<IActionResult> CheckUser(CheckLog log);
        Task<IActionResult> UpdateUser(UpdateUserDto dto);
        Task<IActionResult> UpdateUserPassword(UpdateUserDto dto);
    }
}
