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

  checkOptionsOne = [
    { label: 'Reading', value: 'Reading'},
    { label: 'Cricket', value: 'Cricket' },
    { label: 'Music', value: 'Music' },
    { label: 'Dance', value: 'Dance' },
    { label: 'Chess', value: 'Chess' }
  ];


  protected format(inputDate) {
    let date, month, year;
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${month}/${date}/${year}`;
  }


  submitForm(): void {
    if (this.validateForm.valid) {

    let date = this.validateForm.value.doj;
    date = this.format(date);

    this.employeeObj.name = this.validateForm.value.name;
    this.employeeObj.email = this.validateForm.value.email;
    this.employeeObj.companyId = this.validateForm.value.companyId;
    this.employeeObj.gender = this.validateForm.value.gender;
    this.employeeObj.doj = date;
    this.employeeObj.department = this.validateForm.value.department;

    this.api.postEmployee(this.employeeObj).subscribe((res: any) => {
      console.log(res);
      alert('Employee details added successfully!');
      // this.api.getEmployee();
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

  destroyModal(): void {
    this.modal.destroy();
  }

  getAllEmployeeDetails(){
    this.api.getEmployee().subscribe(res=>{
      this.employeDetails = res;
    })
  }

}
