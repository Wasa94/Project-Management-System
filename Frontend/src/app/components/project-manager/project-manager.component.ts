import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('projectManager');
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  project() {
    sessionStorage.removeItem('modifyProject');
    sessionStorage.setItem('projectManager', JSON.stringify(this.user));
    this.router.navigate(['/project']);
  }

  task() {
    sessionStorage.removeItem('modifyTask');
    sessionStorage.setItem('projectManager', JSON.stringify(this.user));
    this.router.navigate(['/task']);
  }

  projects() {
    sessionStorage.removeItem('modifyProject');
    sessionStorage.setItem('projectManager', JSON.stringify(this.user));
    this.router.navigate(['/projects']);
  }

  tasks() {
    sessionStorage.removeItem('modifyTask');
    sessionStorage.setItem('projectManager', JSON.stringify(this.user));
    this.router.navigate(['/tasks']);
  }

}
