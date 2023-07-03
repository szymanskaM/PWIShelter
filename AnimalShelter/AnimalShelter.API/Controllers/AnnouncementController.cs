using AnimalShelter.Common.Model.Announcements;
using AnimalShelter.Services.Contract;
using Microsoft.AspNetCore.Mvc;

namespace AnimalShelter.API.Controllers
{
    [ApiController]
    [Route("/")]
    public class AnnouncementController : Controller
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpPost]
        [Route("/api/ann")]
        public async Task<IActionResult> AddAnnouncements(CreateAnnouncementDto dto)
        {
            return await _announcementService.AddAnnouncements(dto);
        }
        [HttpDelete]
        [Route("/api/ann/{id}")]
        public async Task<IActionResult> DeleteAnnouncements(long id)
        {
            return await _announcementService.DeleteAnnouncements(id);
        }
        [HttpPatch]
        [Route("/api/ann")]
        public async Task<IActionResult> UpdateAnnouncements(UpdateAnnouncementDto dto)
        {
            return await _announcementService.UpdateAnnouncements(dto);
        }
        [HttpGet]
        [Route("/api/ann")]
        public async Task<IActionResult> SelectAnnouncements()
        {
            return await _announcementService.SelectAnnouncements();
        }
        [HttpGet]
        [Route("/api/ann/user/{userId}")]
        public async Task<IActionResult> SelectAnnouncementsByUserId(long userId)
        {
            return await _announcementService.SelectAnnouncementsByUserId(userId);
        }

    }
}
