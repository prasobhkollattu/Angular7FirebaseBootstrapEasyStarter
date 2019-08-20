import { User } from "./../models/user.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  get user(): User {
    return localStorage.getItem("user")
      ? <User>JSON.parse(localStorage.getItem("user"))
      : null;
  }
  loginUser() {
    let user = this.getUser("Test user", false);
    localStorage.setItem("user", JSON.stringify(user));
  }

  loginAdmin() {
    let user = this.getUser("Test user (Admin)", true);
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    localStorage.setItem("user", null);
  }

  private getUser(username: string, admin: boolean): User {
    return new User(username, admin);
  }
}
