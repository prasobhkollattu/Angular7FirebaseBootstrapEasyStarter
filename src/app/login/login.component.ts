import { AuthService } from "./../service/auth.service";
import { auth } from "firebase/app";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  loginUser() {
    this.authService.loginUser();
    this.router.navigate(["/"]);
  }
  loginAdmin() {
    this.authService.loginAdmin();
    this.router.navigate(["/"]);
  }
}
