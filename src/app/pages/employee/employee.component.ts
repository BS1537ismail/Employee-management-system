import { Component, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  constructor(private masterService: MasterService){}
 
  isFormVisiable = signal<boolean>(false);
  parentDeptList = signal<IParentDept[]>([]);
  childDeptList = signal<IChildDept[]>([]);
  parentDeptId: number = 0;
  ngOnInit(): void {
    this.getParentDept();
  }

  getParentDept() {
    this.masterService.getAllDept().subscribe({
      next: (res: IApiResponse) => {
          this.parentDeptList.set(res.data); 
      }
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
}
