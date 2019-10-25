import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  user: User;
  unassigned = false;

  displayedColumns: string[] = ['project', 'assignee', 'status', 'progress', 'deadline', 'description'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.selectedRow = null;
    this.user = JSON.parse(sessionStorage.getItem('projectManager'));
    if(!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('developer'));
    }
    if(!this.user) {
      this.user = JSON.parse(sessionStorage.getItem('unassigned'));
      if(this.user)
        this.unassigned = true;
    }

    let url = '';
    if (!this.user) {
      url = '/tasks';
    } else if (this.user.role === 'Project Manager') {
      url = '/tasks/projectmanager/' + this.user.username;
    } else if (this.unassigned) {
      url = '/tasks/unassigned';
    }  else {
      url = '/tasks/developer/' + this.user.username;
    }
    this.http.get<Task[]>(this.dataService.backendUrl + url).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Task>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        alert(error);
      }
    );
  }

  selectedRow: Task;

  selectRow(row: Task) {
    this.selectedRow = row;
  }

  delete() {
    if (!confirm("Are you sure to delete selected task?")) {
      return;
    }

    this.http.delete<Task>(this.dataService.backendUrl + '/tasks/' + this.selectedRow.id).subscribe(
      data => {
        alert("Task deleted successfully!");
        this.ngOnInit();
      },
      error => {
        alert(error);
      }
    )
  }

  modify() {
    sessionStorage.setItem('modifyTask', this.selectedRow.id.toString());
    this.router.navigate(['/task']);
  }

  create() {
    sessionStorage.removeItem('modifyTask');
    this.router.navigate(['/task']);
  }

  back() {
    if (!this.user)
      this.router.navigate(['/administrator']);
    else if (this.user.role == 'Project Manager')
      this.router.navigate(['/projectmanager']);
    else
      this.router.navigate(['/developer']);
  }

}
