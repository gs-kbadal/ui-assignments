import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd';
import { ApiService } from '../shared/api.service';
import { employeeModel } from './employee-form.model';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  validateForm!: FormGroup;

  employeeObj : employeeModel = new employeeModel();
  employeDetails: any;
  radioValue = '';
  options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  constructor(private fb: FormBuilder, private modal: NzModalRef, private api: ApiService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      companyId: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      doj: [null, [Validators.required]],
      department : [null, [Validators.required]],
    });
  }

  // to submit the emoloyee details in database
  submitForm(): void {
    if (this.validateForm.valid) {

    this.employeeObj.name = this.validateForm.value.name;
    this.employeeObj.email = this.validateForm.value.email;
    this.employeeObj.companyId = this.validateForm.value.companyId;
    this.employeeObj.gender = this.validateForm.value.gender;
    this.employeeObj.doj = this.validateForm.value.doj;
    this.employeeObj.department = this.validateForm.value.department;

    this.api.postEmployee(this.employeeObj).subscribe((res: any) => {
      alert('Employee details added successfully!');
      this.modal.destroy();
      this.validateForm.reset();
      this.getAllEmployeeDetails();
    },(error: any)=>{
      console.log(error);
    })
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.validateForm.reset;
  }

  log(value: object[]): void {
    console.log(value);
  }

  // to destroy the modal created 
  destroyModal(): void {
    this.modal.destroy();
  }

  // to get all the employee details
  getAllEmployeeDetails(){
    this.api.getEmployee().subscribe(res=>{
      this.employeDetails = res;
    })
  }

}
