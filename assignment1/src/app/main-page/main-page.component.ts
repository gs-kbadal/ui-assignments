import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../auth.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  isVisibleTop = false;
  isVisibleMiddle = false;

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  showModal2(): void {
    this.modalService.create({
      nzTitle: 'Employee details',
      nzContent: EmployeeFormComponent,
      nzCancelText: null,
      nzOkText:null,
    });
  }

  constructor(private modalService: NzModalService,
     private authservice: AuthService,
      private router: Router,
       private route: ActivatedRoute) { }

  user: any;
  name: string = '';

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.name = this.user.username;
  }

  onLogout(){
    this.authservice.logout();
    localStorage.removeItem('user');
    alert('Logout Succesfull!');
    this.router.navigate(['login']);
  }

}
