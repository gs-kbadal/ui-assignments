import { Injectable } from '@angular/core';
import { ApiService } from './shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private api: ApiService) { 
    this.fetchLogin();
  }

  logObj : {id:number, login: boolean} = {
    id: 1,
    login: false
  };

  fetchLogin(){
  //   this.api.getLogIn(1).subscribe(res=>{
  //   this.loggedIn = res.login;
  // })
  const uu = JSON.parse(localStorage.getItem('user'));
  let flag = false;
  if(uu){
    this.loggedIn=true;
  }
  // else{
  //   flag = false;
  // }
  // console.log("loggeIn value",this.loggedIn);
  // if(uu){
  //   flag = 1;
  // }
  }

  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject)=>{
        setTimeout(()=>{
          resolve(this.loggedIn);
        },800)
      }
    );
    return promise;
  }

  login(){
    // this.fetchLogin();
    this.loggedIn = true;
    this.logObj.login = true;
    // this.api.LoggedIn(this.logObj,1).subscribe((res: any)=>{
    //   console.log("logged in");
    //   console.log(res);
    // })
    // console.log(this.logObj.login);
  }

  logout(){
    this.loggedIn = false;
    this.logObj.login = false;
    this.api.LoggedIn(this.logObj,1).subscribe((res: any)=>{
      console.log("logged out");
      console.log(res);
    })
    console.log(this.logObj.login);
  }

  
}
