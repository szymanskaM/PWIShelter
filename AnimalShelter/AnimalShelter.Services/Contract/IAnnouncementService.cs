using AnimalShelter.Common.Model.Announcements;
using AnimalShelter.Common.Model.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimalShelter.Services.Contract
{
    public interface IAnnouncementService
    {
        Task<IActionResult> AddAnnouncements(CreateAnnouncementDto dto);
        Task<IActionResult> UpdateAnnouncements(UpdateAnnouncementDto dto);
        Task<IActionResult> DeleteAnnouncements(long id);//, long userId);
        Task<IActionResult> SelectAnnouncements();
        Task<IActionResult> SelectAnnouncementsByUserId(long userId);
    }
}
