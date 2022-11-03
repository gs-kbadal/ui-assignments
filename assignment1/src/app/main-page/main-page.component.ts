import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { AuthService } from "../auth.service";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  isVisibleTop = false;
  isVisibleMiddle = false;

  fieldPropertyChanged: boolean = false;
  fieldChanged: boolean = false;

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  // to load the form in modal on clicking the add button
  showModal(): void {
    this.modalService.create({
      nzTitle: "Employee details",
      nzContent: EmployeeFormComponent,
      nzCancelText: null,
      nzOkText: null,
    });
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.fieldPropertyChanged || this.fieldChanged) {
      event.returnValue = true;
    }
  }

  //Todo : Format properly - DONE
  constructor(
    private modalService: NzModalService,
    private authservice: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {}

  user: any;
  name: string = "";

  ngOnInit() {
    this.user = this.authservice.getUserName();
    this.name = this.user.username;
  }

  onLogout() {
    this.authservice.logout();
    localStorage.removeItem("user");
    this.createNotification("info", "Logout", "Logout Succesfully");
    this.router.navigate(["login"]);
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
