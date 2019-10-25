import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Project } from 'src/app/models/project.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  user: User;

  displayedColumns: string[] = ['code', 'name', 'assignee', 'progress'];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.selectedRow = null;
    this.user = JSON.parse(sessionStorage.getItem('projectManager'));

    let url = ''
    if (!this.user) {
      url = '/projects';
    } else {
      url = '/projects/projectmanager/' + this.user.username;
    }
    
    this.http.get<Project[]>(this.dataService.backendUrl + url).subscribe(
      data => {
        data.forEach(p => {
          let taskProgress = 0;
          if(p.task != null && p.task.length > 0) {
            p.task.forEach(t => {
              taskProgress += t.progress;
            });
            p.progress = (taskProgress / p.task.length).toFixed(2) + "%";
          } else {
            p.progress = "0.00%";
          }
        });
        this.dataSource = new MatTableDataSource<Project>(data);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        alert(error);
      }
    );
  }
  selectedRow: Project;

  selectRow(row: Project) {
    this.selectedRow = row;
  }

  delete() {
    if (!confirm("Are you sure to delete selected project?")) {
      return;
    }

    this.http.delete<Project>(this.dataService.backendUrl + '/projects/' + this.selectedRow.code).subscribe(
      data => {
        alert("Project deleted successfully!");
        this.ngOnInit();
      },
      error => {
        alert(error);
      }
    )
  }

  modify() {
    sessionStorage.setItem('modifyProject', this.selectedRow.code);
    this.router.navigate(['/project']);
  }

  create() {
    sessionStorage.removeItem('modifyProject');
    this.router.navigate(['/project']);
  }

  back() {
    if (!this.user)
      this.router.navigate(['/administrator']);
    else
      this.router.navigate(['/projectmanager']);
  }

}
