import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginRedirectGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate():
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.authservice.user) {
      let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
      console.log("returnUrl " + returnUrl);
      if (returnUrl) {
        if (this.router.url == "/") this.router.navigate([returnUrl]);
      } else {
        if (this.router.url == "/") this.router.navigate(["/products"]);
      }

      return true;
    }

    return true;
  }
}
