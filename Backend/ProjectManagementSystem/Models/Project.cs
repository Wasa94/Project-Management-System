using System;
using System.Collections.Generic;

namespace ProjectManagementSystem.Models
{
    public partial class Project
    {
        public Project()
        {
            Task = new HashSet<Task>();
        }

        public Guid Code { get; set; }
        public string Name { get; set; }
        public string Assignee { get; set; }

        public virtual User AssigneeNavigation { get; set; }
        public virtual ICollection<Task> Task { get; set; }
    }
}
