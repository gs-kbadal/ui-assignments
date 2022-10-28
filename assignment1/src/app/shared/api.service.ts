import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
// import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // api call for posting data
  postEmployee(data : any){
    return this.http.post<any>("http://localhost:3000/employees",data). //Todo: Endpoints should in constants files
      //Todo: Do not use pipe and map
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // api call for getting employee
  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employees").
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // api call for updating the employee
  updateEmployee(data : any, id: number){
    console.log("api updata",data,id);
    return this.http.put<any>("http://localhost:3000/employees/"+id, data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // api call for deleting the employee
  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:3000/employees/"+id).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // api call for signing the user
  signUp(data:any){
    return this.http.post<any>("http://localhost:3000/users",data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // api call for logging the user
  login(data: any){
    const username = data.username;
    const password = data.password;

    const params = new HttpParams().set("username", username).set("password", password);

    return this.http.get<any>("http://localhost:3000/users",{params}).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // api call for getting the single employee
  getSingleEmployee(id: number){
    return this.http.get<any>("http://localhost:3000/employees/"+id).
    pipe(map((res:any)=>{
      console.log("res:->",res);
      return res;
    }));
  }

}
