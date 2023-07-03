using System.ComponentModel.DataAnnotations;

namespace AnimalShelter.Infrastructure.Entities.Main
{
    public class Announcements
    {
        [Key]
        public long Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public long UserId { get; set; }
    }
}
