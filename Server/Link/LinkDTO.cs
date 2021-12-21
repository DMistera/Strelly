namespace Strelly {
    public class LinkDTO {
        public long Id { get; set; }
        public LinkType Type { get; set; }
        public TaskDTO FromTask { get; set; }
        public TaskDTO ToTask { get; set; }

        public LinkDTO(Link link) {
            Id = link.Id;
            Type = link.Type;
            FromTask = new TaskDTO(link.FromTask);
            ToTask = new TaskDTO(link.ToTask);
        }
    }
}
