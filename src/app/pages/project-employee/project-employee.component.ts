import { Component, signal, OnInit } from '@angular/core';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { Employee } from '../../model/class/Employee';
import { Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit{
  projectEmployeeList = signal<IProjectEmployee[]>([]);
  projectList$ : Observable<IProject[]> = new Observable<IProject[]>;
  EmpList$ : Observable<Employee[]> = new Observable<Employee[]>;
  form: FormGroup = new FormGroup({});


  constructor(private masterService: MasterService){
    this.initializeForm();
    this.projectList$ = this.masterService.getAllProjects();
    this.EmpList$ = this.masterService.getAllEmployee();
  }

  ngOnInit(){
     this.getAllData();
  }

  initializeForm() {
    this.form = new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl( 0),
      assignedDate: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),
    })
  }

  getAllData(){
     this.masterService.getProjectEmp()
     .subscribe((res:IProjectEmployee[]) =>{
        this.projectEmployeeList.set(res);
     })
  }
  onSave(){
     const formValue = this.form.value;
     this.masterService.saveProjectEmp(formValue)
     .subscribe((res:IProject)=>{
      alert("Employee Added To Prokject Created");
      this.getAllData();
      this.form.reset();
     }, error=>{
       alert('API Error');
     })
  }

  onEdit(obj: IProjectEmployee){
    this.form.patchValue({
      empProjectId: obj.empProjectId,
      projectId: obj.projectId,
      empId: obj.empId,
      assignedDate: obj.assignedDate,
      role: obj.role,
      isActive: obj.isActive,
    });
  }

  onUpdateEmployee(){
    const formValue = this.form.value;
     this.masterService.updateProjectEmp(formValue)
     .subscribe((res:IProjectEmployee)=>{
      alert("Employee Updated SuccessFully");
      this.getAllData();
      this.form.reset();
      this.initializeForm();
     }, error=>{
      alert('API Error');
     })
  }

  OnDelete(id: number){
    const isDelete = confirm("Are you sure want to Delete?");
    if(isDelete){
    this.masterService.removeProjectEmpById(id)
    .subscribe((res:IProjectEmployee)=>{
      alert("Deleted Successfully");
      this.getAllData();
    },error=>{
      alert('API Error');
    })
  }
}
}
