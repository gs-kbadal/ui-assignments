import { Injectable } from "@angular/core";
import { ApiService } from "./shared/api.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = false;

  constructor(private api: ApiService) {
    this.fetchLogin();
  }

  fetchLogin() {
    const local_user = JSON.parse(localStorage.getItem("user"));
    if (local_user) {
      this.loggedIn = true;
    }
  }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
