import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate():
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.authservice.user) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
