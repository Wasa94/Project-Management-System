import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

}
