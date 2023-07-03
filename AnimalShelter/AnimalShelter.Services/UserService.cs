using AnimalShelter.Common.Model.Users;
using AnimalShelter.Infrastructure.Entities;
using AnimalShelter.Infrastructure.Entities.Main;
using AnimalShelter.Services.Contract;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace AnimalShelter.Services
{
    public class UserService:IUserService
    {
        private readonly AnimalShelterDbContext _context;

        public UserService(AnimalShelterDbContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> AddUser(CreateUserDto dto)
        {
            var users = _context.Users.Where(u => u.Email==dto.Email).FirstOrDefault();
            if (users == null && Regex.Match(dto.Email, "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$").Success && dto.Password.Length > 7)
            {
                Users user = new Users();
                user.Name = dto.Name;
                user.LastName = dto.LastName;
                user.Email = dto.Email;
                user.Password = dto.Password;
                user.PhoneNumber = dto.PhoneNumber;
                _context.Users.Add(user);
                _context.SaveChanges();
                return new OkObjectResult(user);
            }
            var usersZero = _context.Users.Where(u => u.Email == "").FirstOrDefault();
            return new OkObjectResult(usersZero);
        }

        public async Task<IActionResult> CheckUser(CheckLog log)
        {
            var user=_context.Users.Where(u=>u.Email == log.Email && u.Password==log.Password).FirstOrDefault();
            return new OkObjectResult(user);
        }

        public async Task<IActionResult> UpdateUser(UpdateUserDto dto)
        {
            var user = _context.Users.Where(u => u.Id == dto.Id && u.Password == dto.Password).FirstOrDefault();
            if (user != null)
            {
                user.Name = dto.Name;
                user.LastName = dto.LastName;
                user.Email = dto.Email;
                user.Password = dto.Password;
                user.PhoneNumber = dto.PhoneNumber;
                _context.Users.Update(user);    
            }
            await _context.SaveChangesAsync();
            return new OkResult();
        }
        public async Task<IActionResult> UpdateUserPassword(UpdateUserDto dto)
        {
            var user = _context.Users.Where(u => u.Id == dto.Id && u.Email == dto.Email).FirstOrDefault();
            if (user != null)
            {
                user.Name = dto.Name;
                user.LastName = dto.LastName;
                user.Email = dto.Email;
                user.Password = dto.Password;
                user.PhoneNumber = dto.PhoneNumber;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
            return new OkObjectResult(user);
        }
    }
}