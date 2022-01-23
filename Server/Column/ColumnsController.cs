using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Strelly;

namespace Strelly {
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnsController : ControllerBase {
        private readonly ApplicationDbContext context;

        public ColumnsController(ApplicationDbContext context) {
            this.context = context;
        }

        // GET: api/Columns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Column>>> GetColumn() {
            return await context.Column.OrderBy(column => column.Order).ToListAsync();
        }

        // GET: api/Columns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Column>> GetColumn(long id) {
            var column = await context.Column.FindAsync(id);

            if (column == null) {
                return NotFound();
            }

            return column;
        }

        // PUT: api/Columns/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColumn(long id, ColumnCreateUpdate columnUpdate) {
            if (ColumnExists(id)) {
                Column column = context.Column.Find(id);
                columnUpdate.UpdateColumn(column);
                context.Entry(column).State = EntityState.Modified;
                await UpdateOrder(column.Order, columnUpdate.Order);
                column.Order = columnUpdate.Order;
                await context.SaveChangesAsync();
                return Ok(column);
            } else {
                return NotFound();
            }
        }

        // POST: api/Columns
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Column>> PostColumn(ColumnCreateUpdate columnCreate) {
            Column column = columnCreate.ToColumn();
            column.Order = await context.Column.CountAsync() + 1;
            context.Column.Add(column);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetColumn", new { id = column.Id }, column);
        }

        private async System.Threading.Tasks.Task UpdateOrder(int from, int to) {
            int increment = to > from ? -1 : 1;
            List<Column> columns;
            if (from < to) {
                columns = await context.Column.Where(c => c.Order > from && c.Order <= to).ToListAsync();
            }
            else {
                columns = await context.Column.Where(c => c.Order < from && c.Order >= to).ToListAsync();
            }
            foreach (Column column in columns) {
                column.Order += increment;
                context.Entry(column).State = EntityState.Modified;
            }
        }

        // DELETE: api/Columns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColumn(long id) {
            var column = await context.Column.FindAsync(id);
            if (column == null) {
                return NotFound();
            }

            context.Column.Remove(column);
            await context.SaveChangesAsync();

            return Ok();
        }

        private bool ColumnExists(long id) {
            return context.Column.Any(e => e.Id == id);
        }
    }
}
