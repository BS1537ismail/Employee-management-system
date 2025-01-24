import { Component, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { Employee } from '../../model/class/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  constructor(private masterService: MasterService){}
 
  isFormVisiable = signal<boolean>(false);
  parentDeptList = signal<IParentDept[]>([]);
  employeeList = signal<Employee[]>([]);
  childDeptList = signal<IChildDept[]>([]);
  parentDeptId!: number;
  employeeObj: Employee = new Employee();


  ngOnInit(): void {
    this.getParentDept();
    this.getEmployees();
  }

  getParentDept() {
    this.masterService.getAllDept().subscribe({
      next: (res: IApiResponse) => {
          this.parentDeptList.set(res.data); 
      }
    });
  }
  getEmployees() {
    this.masterService.getAllEmployee()
    .subscribe((res:Employee[])=>{
          this.employeeList.set(res); 
    });
  }

  onParentDeptChange(){
    this.masterService.getChildDeptById(this.parentDeptId)
    .subscribe({
      next: (res: IApiResponse) => {
        this.childDeptList.set(res.data);
      }
    })
  }

  onSave(){
    this.masterService.saveEmployee(this.employeeObj)
    .subscribe((res: IApiResponse)=>{
      alert("Data Save Successfully")
      this.getEmployees();
      this.employeeObj = new Employee();
    }, error=>{
      alert('API Error');
    }
  )
  }

  onEdit(item: Employee){
     this.employeeObj = item;
     this.isFormVisiable.set(true);
  }
  onUpdate(){
    this.masterService.updateEmployee(this.employeeObj)
    .subscribe((res: IApiResponse)=>{
      alert("Data Update Successfully")
      this.getEmployees();
      this.employeeObj = new Employee();
    }, error=>{
      alert('API Error');
    }
  )
  }
  
  onDelete(employeeId: number){
    const isDelete = confirm("Are you sure want to Delete?");
    if(isDelete){
      this.masterService.deleteEmployee(employeeId)
      .subscribe((res: IApiResponse)=>{
      alert("Data Delete Successfully")
      this.getEmployees();
    }, error=>{
      alert('API Error');
    }
    
  )
    }
  }
}
