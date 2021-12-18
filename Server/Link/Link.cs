using System.ComponentModel.DataAnnotations;

namespace Strelly
{
    public class Link
    {
        [Key]
        public long Id { get; set; }
        public LinkType Type { get; set; }
        public Task FromTask { get; set; }
        public Task ToTask { get; set; }
    }
}
