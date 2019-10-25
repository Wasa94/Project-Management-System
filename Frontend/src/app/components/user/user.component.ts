import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = "";
  buttonText = "";
  roles: any = ['Developer', 'Project Manager', 'Administrator'];
  selectedType = 'Developer';
  hidePassword = false;

  createForm = new FormGroup({
    username: new FormControl('', Validators.required),
    role: new FormControl('Developer', Validators.required),
    name: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    const username = sessionStorage.getItem('modifyUser');

    if (username) {
      this.title = "Modify User";
      this.buttonText = "Save";
      this.http.get<User>(this.dataService.backendUrl + '/users/' + username).subscribe(
        data => {
          this.createForm.controls['password'].setValidators(null);

          this.createForm.setValue({
            username: data.username,
            name: data.name,
            role: data.role,
            email: data.email,
            surName: data.surname,
            password: 'password'
          });

          this.createForm.controls['username'].disable();
          this.createForm.controls['password'].disable();
          this.hidePassword = true;
        },
        error => {
          alert(error);
        }
      )
    } else {
      this.buttonText = "Create";
      this.title = "Create User";
    }
  }

  create() {
    const username = sessionStorage.getItem('modifyUser');

    if (username) {
      this.http.put(this.dataService.backendUrl + '/users/' + username, this.createForm.value).subscribe(
        data => {
          alert("User modified successfully!");
          this.router.navigate(['/users']);
        },
        error => {
          alert("Error modifying user!");
        }
      );
    } else {
      this.http.post(this.dataService.backendUrl + '/users', this.createForm.value).subscribe(
        data => {
          alert("User created successfully!");
          sessionStorage.removeItem('modifyUser');
          this.router.navigate(['/users']);
        },
        error => {
          alert("Error creating user!");
        }
      );
    }
  }

}
