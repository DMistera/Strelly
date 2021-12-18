using System.ComponentModel.DataAnnotations;

namespace Strelly
{
    public class Column
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
