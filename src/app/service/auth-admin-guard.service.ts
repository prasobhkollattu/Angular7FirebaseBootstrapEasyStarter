import { AuthService } from "./auth.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.authService.user && this.authService.user.admin) {
      return true;
    }
    return false;
  }
}
