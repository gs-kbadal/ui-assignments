import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "../auth.service";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
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
      nzTitle: "Employee details",
      nzContent: EmployeeFormComponent,
      nzCancelText: null,
      nzOkText: null,
    });
  }

  constructor(
    private modalService: NzModalService,
    private authservice: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: string = "";

  ngOnInit() {
    this.user = this.route.snapshot.params["name"];
    console.log(this.user);
  }

  onLogout() {
    this.authservice.logout();
    alert("Logout Succesfull!");
    this.router.navigate(["login"]);
  }

}
