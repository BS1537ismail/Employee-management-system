import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent implements OnInit{
  constructor(private masterService: MasterService, private router: Router){

  }
  projectList: IProject[] = [];

  ngOnInit(){
    this.getProjects();
  }

  getProjects(){
    this.masterService.getAllProjects()
    .subscribe((res: IProject[]) =>{
      this.projectList = res;
    })
  }
  onEdit(id: number){
    this.router.navigate(['new-project',id])
  }
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.masterService.removeProjectById(id).subscribe({
        next: (res) => {
          alert('Project deleted successfully!');
          // Refresh the project list after deletion
          this.getProjects();
        },
        error: (err) => {
          alert('Failed to delete the project. Please try again.');
        },
      });
    }
  }
  
}
