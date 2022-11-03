import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { ApiService } from "../shared/api.service";
import { Login } from "./login.model";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from "rxjs";


@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  login_form: any;
  subscriptionArray: Subscription[] = [];


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService,
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
      let loginObj : Login;
      loginObj={
        username:this.validateForm.value.userName,
        password:this.validateForm.value.password
      }
      // Todo: unsubscribe mandatory in all the components - DONE
      this.subscriptionArray.push(this.api.login(loginObj).subscribe((res) => {
        const user = res.find((a: any) => {
          return (
            a.username === loginObj.username &&
            a.password === loginObj.password
          );
        });
        if (user) {
          // Todo: Use notification component instead of alert in all places - DONE
          this.createNotification('success','success', 'sucessfully login');
          // Todo: Localstorage should be in service, check all the components - DONE
          this.authService.login(user);
          this.validateForm.reset();
          this.router.navigate(["home","listview"]);
        } else {
          this.createNotification('error', 'error', 'Invalid credential');
        }
      }))
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptionArray && this.subscriptionArray.length) {
      this.subscriptionArray.forEach((subs: Subscription) => {
        if (subs) {
          subs.unsubscribe();
        }
      });
    }
  }
}
