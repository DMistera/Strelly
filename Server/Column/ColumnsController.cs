using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Strelly;

namespace Strelly
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ColumnsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Columns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Column>>> GetColumn()
        {
            return await _context.Column.ToListAsync();
        }

        // GET: api/Columns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Column>> GetColumn(long id)
        {
            var column = await _context.Column.FindAsync(id);

            if (column == null)
            {
                return NotFound();
            }

            return column;
        }

        // PUT: api/Columns/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColumn(long id, Column column)
        {
            if (id != column.Id)
            {
                return BadRequest();
            }

            _context.Entry(column).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColumnExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Columns
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Column>> PostColumn(Column column)
        {
            _context.Column.Add(column);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetColumn", new { id = column.Id }, column);
        }

        // DELETE: api/Columns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColumn(long id)
        {
            var column = await _context.Column.FindAsync(id);
            if (column == null)
            {
                return NotFound();
            }

            _context.Column.Remove(column);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ColumnExists(long id)
        {
            return _context.Column.Any(e => e.Id == id);
        }
    }
}
