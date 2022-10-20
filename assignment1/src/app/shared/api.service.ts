import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
// import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data : any){
    return this.http.post<any>("http://localhost:3000/employees",data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employees").
    pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEmployee(data : any, id: number){
    console.log("api updata",data,id);
    return this.http.put<any>("http://localhost:3000/employees/"+id, data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id: number){
    return this.http.delete<any>("http://localhost:3000/employees/"+id).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  signUp(data:any){
    return this.http.post<any>("http://localhost:3000/users",data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // getSignup(data: any){
  //   return this.http.get<any>("http://localhost:3000/users").
  //   pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }

  login(data: any){
    return this.http.get<any>("http://localhost:3000/users").
    pipe(map((res:any)=>{
      return res;
    }))
  }

  // http://localhost:3000/employees/4

  getSingleEmployee(id: number){
    return this.http.get<any>("http://localhost:3000/employees/"+id).
    pipe(map((res:any)=>{
      console.log("res:->",res);
      return res;
    }));
  }

  // http://localhost:3000/login

  LoggedIn(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/login/"+id, data).
    pipe(map((res:any)=>{
      return res;
    }))
  }

  getLogIn(id: number){
    return this.http.get<any>("http://localhost:3000/login/"+id).
    pipe(map((res:any)=>{
      console.log("res:->",res);
      return res;
    }));
  }

}
