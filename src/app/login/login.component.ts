import { AuthService } from "./../service/auth.service";
import { auth } from "firebase/app";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { RequiredValidator } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  loginUser() {
    this.authService.loginUser();
    if (!this.redirectIfRequired()) {
      this.router.navigate(["/"]);
    }
  }
  loginAdmin() {
    this.authService.loginAdmin();
    if (!this.redirectIfRequired()) {
      this.router.navigate(["/"]);
    }
  }

  private redirectIfRequired() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    console.log("LoginComponent:returnUrl " + returnUrl);
    if (returnUrl) {
      this.router.navigate([returnUrl]);
    }
    return true;
  }
}
