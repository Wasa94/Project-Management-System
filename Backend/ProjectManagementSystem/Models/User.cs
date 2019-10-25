using System;
using System.Collections.Generic;

namespace ProjectManagementSystem.Models
{
    public partial class User
    {
        public User()
        {
            Project = new HashSet<Project>();
            Task = new HashSet<Task>();
        }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Role { get; set; }

        public virtual ICollection<Project> Project { get; set; }
        public virtual ICollection<Task> Task { get; set; }
    }
}
