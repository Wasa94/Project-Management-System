using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementSystem.Models;
using CryptoHelper;

namespace ProjectManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ProjectManagementSystemContext _context;

        public UsersController(ProjectManagementSystemContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            /*if (id != user.Username)
            {
                return BadRequest();
            }*/

            var editUser = await _context.User.FindAsync(id);
            if (editUser == null)
            {
                return BadRequest();
            }

            editUser.Email = user.Email;
            editUser.Name = user.Name;
            editUser.Surname = user.Surname;
            editUser.Role = user.Role;

            _context.Entry(editUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            string password = HashPassword(user.Password);
            user.Password = password;
            try
            {
                _context.User.Add(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                if (UserExists(user.Username))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Username }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpGet]
        [Route("projectManagers")]
        public async Task<ActionResult<IEnumerable<string>>> GetProjectMangers()
        {
            return await _context.User.Where(u => u.Role == "Project Manager").Select(u => u.Username).ToListAsync();
        }

        [HttpGet]
        [Route("developers")]
        public async Task<ActionResult<IEnumerable<string>>> GetDevelopers()
        {
            return await _context.User.Where(u => u.Role == "Developer").Select(u => u.Username).ToListAsync();
        }

        private bool UserExists(string id)
        {
            return _context.User.Any(e => e.Username == id);
        }

        // Method for hashing the password
        private string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }
    }
}
