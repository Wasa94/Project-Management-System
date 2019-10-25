import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { ProjectManagerComponent } from './components/project-manager/project-manager.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'projectmanager', component: ProjectManagerComponent },
  { path: 'developer', component: DeveloperComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user', component: UserComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'task', component: TaskComponent },
  { path: 'changepassword', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
