import { ThrowStmt } from "@angular/compiler"; // TODO Remove unused imports in all the components
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
  loginObj: login = new login(); // TODO: Not required use local variable instead

  userState: any; // Todo : Not required this variable

  constructor(
    private fb: FormBuilder,
    private api: ApiService, // Todo: Use proper naming convention api instead od apiService
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
      this.loginObj.username = this.validateForm.value.userName; // Todo: Take directly .value instead of each value
      this.loginObj.password = this.validateForm.value.password;
      this.api.login(this.loginObj).subscribe((res) => { // Todo: unsubscribe mandatory in all the components
        const user = res.find((a: any) => {
          return (
            a.username === this.loginObj.username &&
            a.password === this.loginObj.password
          );
        });
        if (user) {
          alert("login successfull!!"); // Todo: Use notification component instead of alert in all places
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState)); // Todo: Localstorage should be in service, check all the components
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
