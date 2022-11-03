import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Route, Router } from "@angular/router";
import { NzModalRef, NzNotificationService } from "ng-zorro-antd";
import { Subscription } from "rxjs";
import { ApiService } from "../shared/api.service";
import { EmployeeModel } from "./employee-form.model";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.scss"],
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  @Input() element: number;

  employeeObj: EmployeeModel = new EmployeeModel();
  employeDetails: any;
  employee_post: any;
  employee_details: any;
  subscriptionArray: Subscription[] = [];


  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }

  // to submit the emoloyee details in database
  submitForm(): void {
    if (this.validateForm.valid) {
      // Todo: use directly this.employeeObj = this.validateForm - DONE
      this.employeeObj = this.validateForm.value;

      this.employee_post = this.api.postEmployee(this.employeeObj).subscribe(
        (res: any) => {
          this.createNotification('success','Added', 'Employee details added successfully');
          this.validateForm.reset();
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.validateForm.reset();
  }

  // to get all the employee details
  getAllEmployeeDetails() {
    this.subscriptionArray.push(this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
    }))
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
