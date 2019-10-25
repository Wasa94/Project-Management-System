using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectManagementSystem.DTOs;
using ProjectManagementSystem.Models;
using CryptoHelper;
using Microsoft.EntityFrameworkCore;

namespace ProjectManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ProjectManagementSystemContext _context;

        public AuthenticationController(ProjectManagementSystemContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> Login(UserDTO user)
        {
            if (user == null)
            {
                return BadRequest("User not found!");
            }
            var data = await _context.User.FindAsync(user.Username);

            if (data == null)
            {
                return NotFound("User not found!");
            }

            if (!VerifyPassword(data.Password, user.Password))
            {
                return BadRequest("Wrong Password!");
            }

            return new UserDTO()
            {
                Username = data.Username,
                Email = data.Email,
                Name = data.Name,
                Surname = data.Surname,
                Role = data.Role
            };
        }
        [HttpPost("changepassword")]
        public async Task<ActionResult<bool>> ChangePassword(ChangePasswordDTO user)
        {
            if (user == null)
            {
                return BadRequest("User not found!");
            }
            var editUser = await _context.User.FindAsync(user.Username);

            if (editUser == null)
            {
                return NotFound("User not found!");
            }

            if (!VerifyPassword(editUser.Password, user.OldPassword))
            {
                return BadRequest("Wrong Old Password!");
            }

            _context.Entry(editUser).State = EntityState.Modified;

            editUser.Password = HashPassword(user.NewPassword);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Username))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return true;
        }
        private bool UserExists(string id)
        {
            return _context.User.Any(e => e.Username == id);
        }

        // Method to verify the password hash against the given password
        private bool VerifyPassword(string hash, string password)
        {
            return Crypto.VerifyHashedPassword(hash, password);
        }

        // Method for hashing the password
        private string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }
    }
}