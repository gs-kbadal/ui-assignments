import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Route, Router } from "@angular/router";
import { NzModalRef } from "ng-zorro-antd";
import { ApiService } from "../shared/api.service";
import { employeeModel } from "./employee-form.model";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.scss"],
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;

  employeeObj: employeeModel = new employeeModel();
  employeDetails: any;
  employee_post: any;
  employee_details: any;

  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
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
      this.employeeObj = this.validateForm.value;

      this.employee_post = this.api.postEmployee(this.employeeObj).subscribe(
        (res: any) => {
          alert("Employee details added successfully!");
          this.modal.destroy();
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
    this.employee_details = this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
    });
  }

  ngOnDestroy(): void {
    // this.employee_details.unsubscribe();
    // this.employee_post.unsubscribe();
  }

}
