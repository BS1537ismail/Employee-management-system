import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';
  constructor(private http: HttpClient) { }
  
  getAllDept(): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(this.apiUrl + "GetParentDepartment");
  }
  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }
  getChildDeptById(deptid: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }
  saveEmployee(obj: Employee): Observable<IApiResponse>{
    return this.http.post<IApiResponse>(this.apiUrl + "CreateEmployee", obj);
  }
  
  updateEmployee(obj: Employee): Observable<IApiResponse>{
    return this.http.put<IApiResponse>(this.apiUrl + "UpdateEmployee/" + obj.employeeId, obj);
  }
  deleteEmployee(id: number): Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(this.apiUrl + "DeleteEmployee/" +id);
  }
  saveProject(obj: IProject): Observable<IProject>{
    return this.http.post<IProject>(this.apiUrl + "CreateProject", obj);
  }
  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl + "GetAllProjects");
  }
  getProjectById(id: number){
    return this.http.get<IProject>(this.apiUrl + "/GetProject/" + id);
  }
  updateProject(obj: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.apiUrl + "UpdateProject/"+obj.projectId, obj);
  }
  removeProjectById(id: number){
    return this.http.delete<IProject>(this.apiUrl + "/DeleteProject/" + id);
  }

  getProjectEmp(): Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>(this.apiUrl + "GetAllProjectEmployees");
  }
  saveProjectEmp(obj: IProjectEmployee): Observable<IProject> {
    return this.http.post<IProject>(this.apiUrl + "CreateProjectEmployee", obj);
  } 
  updateProjectEmp(obj: IProjectEmployee): Observable<IProjectEmployee> {
    return this.http.put<IProjectEmployee>(this.apiUrl + "UpdateProjectEmployee/"+obj.empProjectId, obj);
  }
  removeProjectEmpById(id: number): Observable<IProjectEmployee> {
    return this.http.delete<IProjectEmployee>(this.apiUrl + "DeleteProjectEmployee/"+ id);
  }
}
