import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  title = "";
  buttonText = "";
  projectManagers: any;
  selectedProjectManager: string;
  hideCode = false;

  user: User;

  createForm = new FormGroup({
    code: new FormControl(''),
    assignee: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('projectManager'));

    if (!this.user) {
      this.http.get<string[]>(this.dataService.backendUrl + '/users/projectmanagers').subscribe(
        data => {
          this.projectManagers = data;
        },
        error => {
          alert(error);
        }
      );
    } else {
      this.projectManagers = [this.user.username];
      this.selectedProjectManager = this.user.username;
      this.createForm.patchValue({
        assignee: this.user.username
      });
      this.createForm.updateValueAndValidity();
    }

    const projectCode = sessionStorage.getItem('modifyProject');

    if (projectCode) {
      this.title = "Modify Project";
      this.buttonText = "Save";
      this.http.get<Project>(this.dataService.backendUrl + '/projects/' + projectCode).subscribe(
        data => {
          this.createForm.setValue({
            code: data.code,
            assignee: data.assignee,
            name: data.name
          });

          this.createForm.controls['code'].disable();
        },
        error => {
          alert(error);
        }
      )
    } else {
      this.buttonText = "Create";
      this.title = "Create Project";
      this.createForm.controls['code'].disable();
      this.hideCode = true;
    }
  }

  create() {
    const projectCode = sessionStorage.getItem('modifyProject');

    if (projectCode) {
      this.http.put(this.dataService.backendUrl + '/projects/' + projectCode, this.createForm.value).subscribe(
        data => {
          alert("Project modified successfully!");
          if(!this.user)
            this.router.navigate(['/projects']);
          else
            this.router.navigate(['/projectmanager']);
        },
        error => {
          alert("Error modifying project!");
        }
      );
    } else {
      this.http.post(this.dataService.backendUrl + '/projects', this.createForm.value).subscribe(
        data => {
          alert("Project created successfully!");
          sessionStorage.removeItem('modifyProject');
          if(!this.user)
            this.router.navigate(['/projects']);
          else
            this.router.navigate(['/projectmanager']);
        },
        error => {
          alert("Error creating project!");
        }
      );
    }
  }

  cancel() {
    if(!this.user)
      this.router.navigate(['/projects']);
    else
      this.router.navigate(['/projectmanager']);
  }

}
