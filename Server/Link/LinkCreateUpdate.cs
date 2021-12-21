namespace Strelly {
    public class LinkCreateUpdate {
        public LinkType Type { get; set; }
        public long FromTaskId { get; set; }
        public long ToTaskId { get; set; }
    }
}
