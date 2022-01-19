using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Strelly;

namespace Strelly
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public TasksController(ApplicationDbContext context, UserManager<ApplicationUser> userManager) {
            this.context = context;
            this.userManager = userManager;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasks(long columnId)
        {
            IQueryable<Task> query = context.Task.Include(task => task.Column).Include(task => task.Assignees);
            if(columnId > 0) {
                query = query.Where(task => task.Column.Id == columnId);
            }
            var list = await query.ToListAsync();
            return Ok(list.Select(task => new TaskDTO(task)));
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDTO>> GetTask(long id)
        {
            var task = await context.Task.Include(task => task.Column).Include(task => task.Assignees).FirstOrDefaultAsync(task => task.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            return new TaskDTO(task);
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<TaskDTO>> PutTask(long id, TaskCreateUpdate taskUpdate)
        {
            Task task = await context.Task.Include(task => task.Column).Include(task => task.Assignees).FirstOrDefaultAsync(task => task.Id == id);
            if(task == null) {
                return NotFound();
            }
            taskUpdate.UpdateTask(task);
            task.UpdateTime = DateTime.Now;
            context.Entry(task).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(new TaskDTO(task));
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskDTO>> PostTask(TaskCreateUpdate taskCreate)
        {
            Task task = taskCreate.ToTask();
            Column column = await context.Column.FindAsync(taskCreate.ColumnId);
            if(column == null) {
                return NotFound();
            }
            task.Column = column;
            task.CreateTime = DateTime.Now;
            context.Task.Add(task);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, new TaskDTO(task));
        }

        [HttpPost("assigns")]
        public async Task<ActionResult<TaskDTO>> AssignTask(TaskAssignment taskAssigment) {
            var taskAsync = context.Task.Include(task => task.Column).Include(task => task.Assignees).FirstOrDefaultAsync(task => task.Id == taskAssigment.TaskId);
            var applicationUserAsync = userManager.FindByIdAsync(taskAssigment.AssigneeId.ToString());
            Task task = await taskAsync;
            ApplicationUser applicationUser = await applicationUserAsync;
            if (task == null) {
                return NotFound();
            }
            if (applicationUser == null) {
                return NotFound();
            }

            task.Assignees.Add(applicationUser);
            context.Entry(task).State = EntityState.Modified;

            await context.SaveChangesAsync();
            return Ok(new TaskDTO(task));
        }

        [HttpDelete("assigns")]
        public async Task<ActionResult<TaskDTO>> UnassignTask(TaskAssignment taskAssigment) {
            Task task = await context.Task.Include(task => task.Assignees).FirstOrDefaultAsync(task => task.Id == taskAssigment.TaskId);
            if (task == null) {
                return NotFound("TaskId");
            }

            try {
                task.Assignees.Remove(task.Assignees.Where(note => note.Id == taskAssigment.AssigneeId).First());
            }
            catch(Exception e) {
                return NotFound("AssigneeId");
            }

            context.Entry(task).State = EntityState.Modified;

            await context.SaveChangesAsync();
            return Ok(new TaskDTO(task));
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            var task = await context.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            context.Task.Remove(task);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
