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
import { Subscription } from "rxjs";

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
  subscriptionArray: Subscription[] = [];


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

    this.subscriptionArray.push(this.api.getSingleEmployee(this.element).subscribe((res) => {
      this.validateForm.setValue(res);
    }))
  }

  // to get all the employee details
  getAllEmployeeDetails() {
    this.subscriptionArray.push(this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
    }))
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

  updateForm(): void {
    if (this.validateForm.valid) {
      const id = this.validateForm.value.id;
      this.employeeObj = this.validateForm.value;

      this.subscriptionArray.push(this.api.updateEmployee(this.employeeObj, id).subscribe(
        (res: any) => {
          this.createNotification('success','Update', 'Employee details updated successfully')
          this.getAllEmployeeDetails();
          this.router.navigate(["home","listview"]);
        },
        (error: any) => {
          console.log(error);
        }
      ))
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
