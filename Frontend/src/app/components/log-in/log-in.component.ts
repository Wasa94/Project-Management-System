import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.post<User>(this.dataService.backendUrl + '/authentication', this.loginForm.value).subscribe(
      data => {
        sessionStorage.setItem('user', JSON.stringify(data));

        if (data.role == 'Developer') {
          this.router.navigate(['/developer']);
        } else if (data.role == 'Administrator') {
          this.router.navigate(['/administrator']);
        } else if (data.role == 'Project Manager') {
          this.router.navigate(['/projectmanager']);
        }
      },
      error => {
        alert(error.error);
      });
  }

}
