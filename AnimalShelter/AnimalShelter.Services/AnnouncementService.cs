using AnimalShelter.Common.Model.Announcements;
using AnimalShelter.Common.Model.Users;
using AnimalShelter.Infrastructure.Entities;
using AnimalShelter.Infrastructure.Entities.Main;
using AnimalShelter.Services.Contract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalShelter.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly AnimalShelterDbContext _context;

        public AnnouncementService(AnimalShelterDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> AddAnnouncements(CreateAnnouncementDto dto)
        {
            var announcement = new Announcements();
            announcement.Content = dto.Content;
            announcement.PhoneNumber = dto.PhoneNumber;
            announcement.Name = dto.Name;
            announcement.Title=dto.Title;
            announcement.UserId = dto.UserId;
            _context.Announcements.Add(announcement);
            _context.SaveChanges();
            return new OkObjectResult(announcement);
        }

        public async Task<IActionResult> DeleteAnnouncements(long id)//,long userId)
        {
            var announcement= _context.Announcements.Where(a=>a.Id==id).FirstOrDefault();
            if (announcement!=null)
            {
                _context.Announcements.Remove(announcement);
                _context.SaveChanges();
            }
            return new OkObjectResult(announcement);
        }

        public async Task<IActionResult> UpdateAnnouncements(UpdateAnnouncementDto dto)
        {
            var announcement = _context.Announcements.Where(a => a.Id == dto.Id).FirstOrDefault();
            if (announcement != null)
            {
                announcement.Content=dto.Content;
                announcement.PhoneNumber=dto.PhoneNumber;
                announcement.Name=dto.Name;
                announcement.Title= dto.Title;
                _context.Announcements.Update(announcement);
                _context.SaveChanges();
            }
            return new OkObjectResult(announcement);
        }
        public async Task<IActionResult> SelectAnnouncements()
        {
            var announcement = _context.Announcements.ToList();
            return new OkObjectResult(announcement);
        }
        public async Task<IActionResult> SelectAnnouncementsByUserId(long userId)
        {
            var announcement = _context.Announcements.Where(a => a.UserId == userId).ToList();
            return new OkObjectResult(announcement);
        }
    }
}
