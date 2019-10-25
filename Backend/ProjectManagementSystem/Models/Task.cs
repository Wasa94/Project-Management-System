using System;
using System.Collections.Generic;

namespace ProjectManagementSystem.Models
{
    public partial class Task
    {
        public int Id { get; set; }
        public string Assignee { get; set; }
        public string Status { get; set; }
        public int Progress { get; set; }
        public DateTime Deadline { get; set; }
        public string Description { get; set; }
        public Guid ProjectId { get; set; }

        public virtual User AssigneeNavigation { get; set; }
        public virtual Project Project { get; set; }
    }
}
