import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Route, Router } from "@angular/router";
import { NzModalRef, NzNotificationService } from "ng-zorro-antd";
import { ApiService } from "../shared/api.service";
import { EmployeeModel } from "../employee-form/employee-form.model";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  validateForm!: FormGroup;
  @Input() element: number;

  employeeObj: EmployeeModel = new EmployeeModel();
  employeDetails: any;
  employee_post: any;
  employee_details: any;

  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  constructor(
    private fb: FormBuilder,
    // private modal: NzModalRef,
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

    this.api.getSingleEmployee(this.element).subscribe((res) => {
      this.validateForm.setValue(res);
    });
  }

  // to submit the emoloyee details in database
  // submitForm(): void {
  //   if (this.validateForm.valid) {
  //     this.employeeObj = this.validateForm.value;

  //     this.employee_post = this.api.postEmployee(this.employeeObj).subscribe(
  //       (res: any) => {
  //         alert("Employee details added successfully!");
  //         // this.modal.destroy();
  //         this.validateForm.reset();
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     Object.values(this.validateForm.controls).forEach((control) => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  //   this.validateForm.reset();
  // }

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

  updateForm(): void {
    if (this.validateForm.valid) {
      const id = this.validateForm.value.id;
      this.employeeObj = this.validateForm.value;

      this.api.updateEmployee(this.employeeObj, id).subscribe(
        (res: any) => {
          // alert("Employee details updated successfully!");
          this.createNotification('success','Update', 'Employee details updated successfully')
          this.getAllEmployeeDetails();
          this.router.navigate(["home","listview"]);
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

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(
      type,
      title,
      message
    );
  }

}
