import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'role', 'email'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  username = "";

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.selectedRow = null;
    this.http.get<User[]>(this.dataService.backendUrl + '/users').subscribe(
      data => {
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        alert(error);
      }
    );

    this.username = JSON.parse(sessionStorage.getItem('user')).username;
  }
  selectedRow: User;

  selectRow(row: User) {
    this.selectedRow = row;
  }

  delete() {
    if (!confirm("Are you sure to delete selected user?")) {
      return;
    }

    this.http.delete<User>(this.dataService.backendUrl + '/users/' + this.selectedRow.username).subscribe(
      data => {
        alert("User deleted successfully!");
        this.ngOnInit();
      },
      error => {
        alert(error);
      }
    )
  }

  modify() {
    sessionStorage.setItem('modifyUser', this.selectedRow.username);
    this.router.navigate(['/user']);
  }

  create() {
    sessionStorage.removeItem('modifyUser');
    this.router.navigate(['/user']);
  }

}
