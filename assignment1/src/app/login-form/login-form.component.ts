import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { ApiService } from "../shared/api.service";
import { login } from "./login.model";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  login_form: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  // for user logging
  submitForm(): void {
    if (this.validateForm.valid) {
      let loginObj : login;
      // let loginObj: login ;
      loginObj={
        username:this.validateForm.value.userName,
        password:this.validateForm.value.password
      }
      
      this.login_form = this.api.login(loginObj).subscribe((res) => {
        const user = res.find((a: any) => {
          return (
            a.username === loginObj.username &&
            a.password === loginObj.password
          );
        });
        if (user) {
          alert("login successfull!!");
          let userState = user;
          localStorage.setItem('user', JSON.stringify(userState));
          this.authService.login();
          this.validateForm.reset();
          this.router.navigate(["home","listview"]);
        } else {
          alert("invalid credentials!");
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy(): void {
    // this.login_form.unsubscribe();
  }
}
