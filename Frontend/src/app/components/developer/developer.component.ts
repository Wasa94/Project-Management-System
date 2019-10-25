import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('developer');
    sessionStorage.removeItem('unassigned');
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  mytasks() {
    sessionStorage.removeItem('modifyTask');
    sessionStorage.setItem('developer', JSON.stringify(this.user));
    this.router.navigate(['/tasks']);
  }

  unassigned() {
    sessionStorage.removeItem('modifyTask');
    sessionStorage.setItem('unassigned', JSON.stringify(this.user));
    this.router.navigate(['/tasks']);
  }

}
