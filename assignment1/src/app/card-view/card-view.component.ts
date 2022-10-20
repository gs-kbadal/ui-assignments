import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd";
import { employeeModel } from "../employee-form/employee-form.model";
import { ApiService } from "../shared/api.service";

@Component({
  selector: "app-card-view",
  templateUrl: "./card-view.component.html",
  styleUrls: ["./card-view.component.scss"],
})
export class CardViewComponent implements OnInit {

  employeeObj : employeeModel = new employeeModel();

  employeDetails!: employeeModel;
  validateForm : FormGroup;

  radioValue = '';
  options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  isVisible = false;
  isCancel = null;
  isOk = null;

  constructor(private api: ApiService, private modalService: NzModalService,private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllEmployeeDetails();

    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department : [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log("submit", this.validateForm.value);
      const id = this.validateForm.value.id;
      console.log("value of id->", id);
      console.log("coming data id for form", id);
      this.employeeObj = this.validateForm.value;
      console.log("emp--->", this.employeeObj);

      this.api.updateEmployee(this.employeeObj, id).subscribe(
        (res: any) => {
          console.log("api sending for update->", res);
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

  format(inputDate) {
    let date, month, year;

    const day = (inputDate).slice(0,10);

    year = day.slice(0,4);
    month = day.slice(5,7);
    date = day.slice(8,10);
    let dd = parseInt(date) + 1;
    if(dd===32){
      dd=31;
    }
    date = dd;
  
    return `${month}/${date}/${year}`;
  }

  getAllEmployeeDetails() {
    this.api.getEmployee().subscribe((res) => {
      this.employeDetails = res;
      for(var index in this.employeDetails){
        let day = this.format(this.employeDetails[index].doj);
        this.employeDetails[index].doj = day;
      }
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert("Employee deleted!");
      this.getAllEmployeeDetails();
    });
  }

  showModal(data: any): void {
    this.isVisible = true;
    nzCancelText: null;
    nzOkText: null;
    this.validateForm.setValue(data);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
}
