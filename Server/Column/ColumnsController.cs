using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Strelly;

namespace Strelly {
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
            return await context.Column.ToListAsync();
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
            context.Column.Add(column);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetColumn", new { id = column.Id }, column);
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
