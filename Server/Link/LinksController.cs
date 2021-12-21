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
    public class LinksController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public LinksController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/Links
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinkDTO>>> GetLink()
        {
            var list = await context.Link.Include(link => link.FromTask).Include(link => link.ToTask).ToListAsync();
            return Ok(list.Select(link => new LinkDTO(link)));
        }

        // GET: api/Links/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LinkDTO>> GetLink(long id)
        {
            var link = await context.Link.Include(link => link.FromTask).Include(link => link.ToTask).FirstOrDefaultAsync(link => link.Id == id);

            if (link == null)
            {
                return NotFound();
            }

            return new LinkDTO(link);
        }

        // PUT: api/Links/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<LinkDTO>> PutLink(long id, LinkCreateUpdate linkUpdate)
        {

            Link link = await context.Link.FindAsync(id);
            if(link == null) {
                return NotFound();
            }
            link.FromTask = await context.Task.FindAsync(linkUpdate.FromTaskId);
            if (link.FromTask == null) {
                return NotFound("FromTaskId");
            }
            link.ToTask = await context.Task.FindAsync(linkUpdate.ToTaskId);
            if (link.ToTask == null) {
                return NotFound("ToTaskId");
            }

            context.Entry(link).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return Ok(link);
        }

        // POST: api/Links
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LinkDTO>> PostLink(LinkCreateUpdate linkCreate)
        {
            Link link = new();
            link.Type = linkCreate.Type;
            link.FromTask = await context.Task.FindAsync(linkCreate.FromTaskId);
            if(link.FromTask == null) {
                return NotFound("FromTaskId");
            }
            link.ToTask = await context.Task.FindAsync(linkCreate.ToTaskId);
            if (link.ToTask == null) {
                return NotFound("ToTaskId");
            }
            context.Link.Add(link);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetLink", new { id = link.Id }, link);
        }

        // DELETE: api/Links/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLink(long id)
        {
            var link = await context.Link.FindAsync(id);
            if (link == null)
            {
                return NotFound();
            }

            context.Link.Remove(link);
            await context.SaveChangesAsync();

            return Ok();
        }

        
    }
}
