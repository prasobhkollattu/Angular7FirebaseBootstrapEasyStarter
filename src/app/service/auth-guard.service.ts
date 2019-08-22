import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}
  canActivate(
    route,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    console.log("state url " + state.url);
    console.log("returnUrl " + this.router.url);
    let returnUrl: string;
    if (this.router.url.length > 1) {
      returnUrl = this.router.url;
    } else if (state.url.length > 1) {
      returnUrl = state.url;
    }

    if (this.authservice.user) {
      return true;
    }

    this.router.navigate(["/login"], {
      queryParams: { returnUrl: returnUrl }
    });
    return false;
  }
}
