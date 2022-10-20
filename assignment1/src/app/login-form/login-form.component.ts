import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
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
export class LoginFormComponent implements OnInit {
  validateForm!: FormGroup;
  loginObj: login = new login();

  userState: any;

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
      remember: [true],
    });
  }

  // for user logging
  submitForm(): void {
    if (this.validateForm.valid) {
      this.loginObj.username = this.validateForm.value.userName;
      this.loginObj.password = this.validateForm.value.password;
      this.api.login(this.loginObj).subscribe((res) => {
        const user = res.find((a: any) => {
          return (
            a.username === this.loginObj.username &&
            a.password === this.loginObj.password
          );
        });
        if (user) {
          alert("login successfull!!");
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
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
}
