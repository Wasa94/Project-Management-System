import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: User;

  form = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])([A-Za-z][A-Za-z0-9!@#\\$%\\^&\\*]{7,})$")]),
    repeatPassword: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  change() {
    if(this.form.value['newPassword'] !== this.form.value['repeatPassword']) {
      alert('Passwords do not match!');
      return;
    }
    const changePass = {
      username: this.user.username,
      oldPassword: this.form.value['oldPassword'],
      newPassword: this.form.value['newPassword'],
      repeatPassword: this.form.value['repeatPassword']
    }

    this.http.post(this.dataService.backendUrl + '/authentication/changepassword', changePass).subscribe(
      data => {
        sessionStorage.clear();
        alert('Password successfully changed!');
        this.router.navigate(['/login']);
      },
      error => {
        if(error.error)
          alert(error.error);
        else
          alert(error)
      });
  }

  cancel() {
    if(this.user.role == 'Administrator') {
      this.router.navigate(['/administrator']);
    } else if(this.user.role == 'Developer') {
      this.router.navigate(['/developer']);
    }  else {
      this.router.navigate(['/projectmanager']);
    } 
  }

}
