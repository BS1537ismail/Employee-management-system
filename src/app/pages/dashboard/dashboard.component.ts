import { Component, NgModule, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
    dashboardData: any;
  constructor(private masterService: MasterService){

  }
  ngOnInit(): void {
    this.getDashboard();
  }
  getDashboard(){
    this.masterService.getDashbvaordData()
    .subscribe((res:any)=>{
      this.dashboardData = res;
    })
  }
}
