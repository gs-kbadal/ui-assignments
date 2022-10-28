import { registerLocaleData } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../shared/api.service";
import { registration } from "./registration.model";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registerObj: registration = new registration();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      // uname: [null, [Validators.required]],
      uemail: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      agree: [false], // Todo: why not using agree ?
    });
  }

  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.registerObj.username = this.validateForm.value.uemail;
      this.registerObj.password = this.validateForm.value.password;
      this.registerObj.role = "user";

      this.api.login(this.registerObj).subscribe((res) => {
        const user = res.find((a: any) => {
          return a.username === this.registerObj.username;
        });
        if (user) {
          alert("username already exists!!");
        } else {
          this.api.signUp(this.registerObj).subscribe(
            (res: any) => {
              alert("SignUp successfull!");
              this.validateForm.reset();
            },
            (error: any) => {
              console.log(error); // Todo: Should show some error in error state where ever you log error
            }
          );
          this.router.navigate(["login"]);
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
  // Todo: Remove unused code across the project
  log(value: object[]): void {
    console.log(value);
  }
}
