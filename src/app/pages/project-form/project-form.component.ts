import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { IProject } from '../../model/interface/master';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectForm: FormGroup = new FormGroup({});
  emplList$: Observable<Employee[]> = new Observable<[]>;

  constructor(private activatedRout: ActivatedRoute, private masterService: MasterService, private router: Router){
     this.emplList$ = this.masterService.getAllEmployee();
     this.initialization();
     this.activatedRout.params.subscribe((res: any)=>{
      if(res.id != 0){
        this.getProject(res.id);
      }
     })
  }
  initialization(data?: IProject){
    this.projectForm = new FormGroup({
      projectId: new FormControl(data ? data.projectId : 0),
      projectName: new FormControl(data ? data.projectName : ''),
      clientName: new FormControl(data ? data.clientName : ''),
      startDate: new FormControl(data ? data.startDate : ''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId : ''),
      contactPerson: new FormControl(data ? data.contactPerson : ''),
      contactNo: new FormControl(data ? data.contactNo : ''),
      emailId: new FormControl(data ? data.emailId : '')
    })
  }
  getProject(id: number){
      this.masterService.getProjectById(id)
      .subscribe((res: IProject)=>{
        this.initialization(res);
      }, error=>{
        alert('API Error');
      }
    )
  }

  onSaveProject(){
    const formValue = this.projectForm.value;
      this.masterService.saveProject(formValue)
      .subscribe((res: IProject)=>{
        alert("Data Save Successfully")
        this.projectForm.reset();
        this.router.navigate(['project']);
      }, error=>{
        alert('API Error');
      }
    )
    }
    onUpdateProject(){
      const formValue = this.projectForm.value;
      this.masterService.updateProject(formValue)
      .subscribe((res: IProject)=>{
        alert("Data Update Successfully")
        this.projectForm.reset();
        this.router.navigate(['project']);
      }, error=>{
        alert('API Error');
      }
    )
    }
}


