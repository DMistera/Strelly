namespace Strelly {
    public class TaskDTO {

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Column Column { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime UpdateTime { get; set; }
        public IEnumerable<ApplicationUserDTO> Assignees { get; set; }

        public TaskDTO(Task task) {
            Id = task.Id;
            Name = task.Name;
            Description = task.Description;
            Column = task.Column;
            CreateTime = task.CreateTime;
            UpdateTime = task.UpdateTime;
            Assignees = task.Assignees.Select(assignee => new ApplicationUserDTO(assignee));
        }

    }
}
