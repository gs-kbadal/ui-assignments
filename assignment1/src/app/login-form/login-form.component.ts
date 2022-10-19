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

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loginObj.username = this.validateForm.value.userName;
      this.loginObj.password = this.validateForm.value.password;
      console.log(this.loginObj.username);
      console.log(this.loginObj.password);
      this.api.login(this.loginObj).subscribe((res) => {
        const user = res.find((a: any) => {
          return a.username === this.loginObj.username && a.password === this.loginObj.password;
        });
        if (user) {
          alert("login successfull!!");
          this.authService.login();
          this.validateForm.reset();
          const n = this.loginObj.username;
          this.router.navigate(["home",n]);
        }
        else{
          alert('invalid credentials!');
        }
      });
      console.log("submit", this.validateForm.value);
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
