using System.ComponentModel.DataAnnotations;

namespace Strelly {
    public class TaskCreateUpdate {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public long ColumnId { get; set; }


        public void UpdateTask(Task task) {
            task.Name = Name;
            task.Description = Description;
        }

        public Task ToTask () {
            Task task = new();
            UpdateTask(task);
            return task;
        }
    }
}
