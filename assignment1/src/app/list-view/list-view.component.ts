import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { employeeModel } from "../employee-form/employee-form.model";
import { ApiService } from "../shared/api.service";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
})
export class ListViewComponent implements OnInit {
  employeeObj: employeeModel = new employeeModel();

  employeDetails!: employeeModel;
  validateForm: FormGroup;

  radioValue = "";
  options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  isVisible = false;
  isCancel = null;
  isOk = null;

  pageIndex = 1;
  pageSize = 3;
  // total = 500;

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

  // to update the employee details
  updateForm(): void {
    if (this.validateForm.valid) {
      const id = this.validateForm.value.id;
      this.employeeObj = this.validateForm.value;

      this.api.updateEmployee(this.employeeObj, id).subscribe(
        (res: any) => {
          alert("Employee details updated successfully!");
          this.isVisible = false;
          this.getAllEmployeeDetails();
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
    this.validateForm.reset;
  }

  // to format the date according to MM/DD/YYYY
  format(inputDate: any) {
    let date: any, month: any, year: any;
    const day = inputDate.slice(0, 10);

    year = day.slice(0, 4);
    month = day.slice(5, 7);
    date = day.slice(8, 10);

    return `${month}/${date}/${year}`;
  }

  // to get all the employee details
  getAllEmployeeDetails() {
    this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
      for (var index in this.employeDetails) {
        let day = this.format(this.employeDetails[index].doj);
        this.employeDetails[index].doj = day;
      }
    });
  }

  // to delete the employee details
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert("Employee deleted!");
      this.getAllEmployeeDetails();
    });
  }

  // to show edit form in modal and also prepulate the form
  showModal(data: any): void {
    this.isVisible = true;
    nzCancelText: null;
    nzOkText: null;
    this.api.getSingleEmployee(data.id).subscribe((res) => {
      this.validateForm.setValue(res);
    });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
