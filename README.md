# Project-Management-System

The goal of this task is to develop a full solution for managing small projects (project management system).<br><br>
Requirements:<br>
• Projects are used to organize tasks into logical units. Required attributes are: project name and project code (unique).<br>
• Tasks are used as a child of Project. One Task can belong to one Project, and one project can have many tasks. Required attributes for tasks are: assignee (user to whom this tickets is assigned to), status (new, in progress, finished), progress (% of completed), deadline, description.<br>
• Users – required attributes: username (unique), email, name and surname and role.<br>
• Roles – required roles: Administrator, Project Manager or Developer.<br>
• A system for tracking Tasks and User assignments is administered by the Administrator, who is allowed to do any of the scenarios defined below.<br><br>
Scenarios:<br>
• All Users use the same login form.<br>
• Administrator can view, create, modify and delete Projects, Tasks and Users. If Administrator is creating Project, he must select Project Manager to manage the project. Project managers are Users with Role Project Manager.<br>
• Administrator can assign / unassign a Task to a User.<br>
• Project Managers can create Projects, Tasks and assign Tasks to the Developers.<br>
• Developers cannot have more than 3 tasks assigned.<br>
• User can modify Task only if it is assigned to him / her. User with Developer role is allowed to change: status, progress, description. User with Project Manager role is allowed to change: assignee, status, progress, deadline, description.<br>
• User can view only tasks that are assigned to him / her OR are not assigned to anyone.<br>
• Project manager can view a list of projects and their progress. Project progress is based on progress of all project tasks. (e.g. project with three tasks with progress 0%, 50% and 100% has progress 50%).<br><br>
Additional Requirements:<br>
• Unit test implemented to cover some of the processes of application.<br><br>
Frontend: Angular 8<br>
Backend: .Net Core 3.0<br>
Database: SQL Server 2017
