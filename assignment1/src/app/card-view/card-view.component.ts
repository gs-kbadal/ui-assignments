import { ThrowStmt } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd";
import { Subscription } from "rxjs";
import { EmployeeModel } from "../employee-form/employee-form.model";
import { ApiService } from "../shared/api.service";

@Component({
  selector: "app-card-view",
  templateUrl: "./card-view.component.html",
  styleUrls: ["./card-view.component.scss"],
})
export class CardViewComponent implements OnInit, OnDestroy {
  employeeObj: EmployeeModel = new EmployeeModel();

  employeDetails!: EmployeeModel;
  validateForm: FormGroup;
  employee_details: any;
  employee_delete: any;
  employee_update: any;
  subscriptionArray: Subscription[] = [];


  deleteId: number;
  deleteConfirm = false;
  isDeleteModalOpen = false;

  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  dataId: Number;
  visible = false;

  isVisible = false;
  isCancel = null;
  isOk = null;
  

  constructor(
    private api: ApiService,
    private modalService: NzModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllEmployeeDetails();

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

  open(id:number): void {
    this.visible = true;
    this.dataId = id;
    console.log(this.visible);
  }

  close(): void {
    this.visible = false;
  }

  // to update the employee details
  updateForm(): void {
    if (this.validateForm.valid) {
      const id = this.validateForm.value.id;
      this.employeeObj = this.validateForm.value;

      this.subscriptionArray.push(this.api.updateEmployee(this.employeeObj, id).subscribe(
        (res: any) => {
          alert("Employee details updated successfully!");
          this.isVisible = false;
          this.getAllEmployeeDetails();
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
    this.validateForm.reset;
  }

  // to get all the employee details
  getAllEmployeeDetails() {
    this.subscriptionArray.push(this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
    }))
  }

  // to delete the employee details
  deleteEmployee(row: any) {
    this.isDeleteModalOpen = true;
    this.deleteId = row.id;
  }


  handleDelete(){
    this.isDeleteModalOpen = false;
    this.subscriptionArray.push(this.api.deleteEmployee(this.deleteId).subscribe((res) => {
      this.getAllEmployeeDetails();
    }))
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isDeleteModalOpen = false;
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
