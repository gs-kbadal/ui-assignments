import { ThrowStmt } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { EmployeeModel } from "../employee-form/employee-form.model";
import { ApiService } from "../shared/api.service";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from "rxjs";


@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
})
export class ListViewComponent implements OnInit, OnDestroy {
  employeeObj: EmployeeModel = new EmployeeModel();

  employeDetails!: EmployeeModel[]; // Todo: Type should be array ex: employeeModel[] - DONE
  validateForm: FormGroup;
  subscriptionArray: Subscription[] = [];

  employee_details: any;
  employee_delete: any;
  employee_update: any;

  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  dataId: Number;
  visible = false;
  isVisible = false;
  isCancel = null;
  isOk = null;

  pageIndex = 1;
  pageSize = 3;

  deleteId: number;
  deleteConfirm = false;
  isDeleteModalOpen = false;

  constructor(
    private api: ApiService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private notification: NzNotificationService
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
    console.log(this.visible);
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
          // this.createNotification('success','Update', 'Employee details updated successfully')
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
    this.validateForm.reset(); // Todo: reset is a method should use braces () in all the components- DONE
  }

  // to get all the employee details
  getAllEmployeeDetails() {
    this.subscriptionArray.push(this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
    }))
  }

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

  // to show edit form in modal and also prepopulate the form
  showModal(data: any): void {
    this.isVisible = true;
    nzCancelText: null;
    nzOkText: null;
    this.subscriptionArray.push(this.api.getSingleEmployee(data.id).subscribe((res) => {
      this.validateForm.setValue(res);
    }))
  }


  handleCancel(): void {
    this.isVisible = false;
    this.isDeleteModalOpen = false;
  }

  // to unsubscribe
  ngOnDestroy(): void {
    if (this.subscriptionArray && this.subscriptionArray.length) {
      this.subscriptionArray.forEach((subs: Subscription) => {
        if (subs) {
          subs.unsubscribe();
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

}
