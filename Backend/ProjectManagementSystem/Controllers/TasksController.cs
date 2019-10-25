using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementSystem.Models;
using Task = ProjectManagementSystem.Models.Task;

namespace ProjectManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ProjectManagementSystemContext _context;

        public TasksController(ProjectManagementSystemContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTask()
        {
            return await _context.Task.Include("Project").ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await _context.Task.Include("Project").FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Task task)
        {
            /*if (id != task.Id)
            {
                return BadRequest();
            }*/

            var editTask = await _context.Task.FindAsync(id);
            if (editTask == null)
            {
                return BadRequest();
            }

            if (task.Assignee != null && editTask.Assignee != task.Assignee)
            {
                var tasks = _context.Task.Where(t => t.Assignee == task.Assignee);
                if(tasks.Count() == 3)
                {
                    return BadRequest("Selected developer already have 3 tasks!");
                }
            }

            editTask.Description = task.Description;
            editTask.Deadline = task.Deadline;
            editTask.Assignee = task.Assignee;
            editTask.ProjectId = task.ProjectId;
            editTask.Status = task.Status;
            editTask.Progress = task.Progress;

            _context.Entry(editTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(Task task)
        {
            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Task>> DeleteTask(int id)
        {
            var task = await _context.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Task.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }

        // GET: api/Tasks/projectmanager
        [HttpGet("projectmanager/{username}")]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasksByProjectManager(string username)
        {
            return await _context.Task.Include("Project").Where(t => t.Project != null && t.Project.Assignee == username).ToListAsync();
        }

        // GET: api/Tasks/developer
        [HttpGet("developer/{username}")]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasksByDeveloper(string username)
        {
            return await _context.Task.Include("Project").Where(t => t.Assignee == username).ToListAsync();
        }

        // GET: api/Tasks/unassigned
        [HttpGet("unassigned")]
        public async Task<ActionResult<IEnumerable<Task>>> GetUnassignedTasks()
        {
            return await _context.Task.Include("Project").Where(t => t.Assignee == null).ToListAsync();
        }

        private bool TaskExists(int id)
        {
            return _context.Task.Any(e => e.Id == id);
        }
    }
}
