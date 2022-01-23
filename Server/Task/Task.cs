using System.ComponentModel.DataAnnotations;

namespace Strelly
{
    public class Task
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Column Column { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public ICollection<ApplicationUser> Assignees { get; set; }
        public int Order { get; set; }
    }
}
