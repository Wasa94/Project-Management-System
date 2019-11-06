import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  minDate = new Date();
  title = "";
  buttonText = "";
  projects: any;
  selectedProject: string;
  developers: any;
  selectedDeveloper: string;
  statuses: any = ['New', 'In Progress', 'Finished'];
  selectedStatus: string;
  user: User;

  createForm = new FormGroup({
    description: new FormControl('', Validators.required),
    assignee: new FormControl(''),
    project: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    progress: new FormControl('', [Validators.required, Validators.max(100), Validators.min(0)])
  });

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.http.get<string[]>(this.dataService.backendUrl + '/users/developers').subscribe(
      data => {
        this.developers = data;
        this.developers.unshift("");
      },
      error => {
        alert(error);
      }
    );

    this.user = JSON.parse(sessionStorage.getItem('projectManager'));
    if(!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('developer'));
    }

    if (!this.user) {
      this.http.get<Project[]>(this.dataService.backendUrl + '/projects').subscribe(
        data => {
          this.projects = [];
          data.forEach(p => this.projects.push({ value: p.code, viewValue: p.name }));
        },
        error => {
          alert(error);
        }
      );
    } else {
      this.http.get<Project[]>(this.dataService.backendUrl + '/projects/projectmanager/' + this.user.username).subscribe(
        data => {
          this.projects = [];
          data.forEach(p => this.projects.push({ value: p.code, viewValue: p.name }));
        },
        error => {
          alert(error);
        }
      );
    }

    const taskId = sessionStorage.getItem('modifyTask');

    if (taskId) {
      this.title = "Modify Task";
      this.buttonText = "Save";
      this.http.get<Task>(this.dataService.backendUrl + '/tasks/' + taskId).subscribe(
        data => {
          const projectCode = data.project ? data.project.code : null;
          this.createForm.setValue({
            description: data.description,
            assignee: data.assignee,
            project: projectCode,
            deadline: new Date(data.deadline),
            progress: data.progress,
            status: data.status
          });

          if (this.user && this.user.role == "Project Manager") {
            this.createForm.controls['project'].disable();
          } else if (this.user && this.user.role == "Developer") {
            this.createForm.controls['project'].disable();
            this.createForm.controls['assignee'].disable();
            this.createForm.controls['deadline'].disable();
          }
        },
        error => {
          alert(error);
        }
      )
    } else {
      this.buttonText = "Create";
      this.title = "Create Task";
    }
  }

  create() {
    const taskId = sessionStorage.getItem('modifyTask');

    const newTask = new Task();
    newTask.deadline = new Date(Date.UTC(this.createForm.getRawValue()['deadline'].getFullYear(), this.createForm.getRawValue()['deadline'].getMonth(), this.createForm.getRawValue()['deadline'].getDate()));
    newTask.description = this.createForm.value['description'];
    newTask.assignee = this.createForm.getRawValue()['assignee'] === "" ? null : this.createForm.getRawValue()['assignee'];
    newTask.progress = this.createForm.value['progress'];
    newTask.status = this.createForm.value['status'];
    newTask.projectId = this.createForm.getRawValue()['project'];

    if (taskId) {
      this.http.put(this.dataService.backendUrl + '/tasks/' + taskId, newTask).subscribe(
        data => {
          alert("Task modified successfully!");
          this.cancel();
        },
        error => {
          alert(error);
          alert("Error modifying task!");
        }
      );
    } else {
      this.http.post(this.dataService.backendUrl + '/tasks', newTask).subscribe(
        data => {
          alert("Task created successfully!");
          sessionStorage.removeItem('modifyTask');
          this.cancel();
        },
        error => {
          alert(error);
          alert("Error creating task!");
        }
      );
    }
  }

  cancel() {
    if (!this.user)
      this.router.navigate(['/tasks']);
    else if (this.user.role == 'Project Manager')
      this.router.navigate(['/projectmanager']);
    else
      this.router.navigate(['/developer']);
  }

}
