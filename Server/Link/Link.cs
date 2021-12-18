using System.ComponentModel.DataAnnotations;

namespace Strelly.Link
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
