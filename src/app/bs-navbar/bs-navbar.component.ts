import { ShoppingCart } from "./../models/shopping-cart.model";
import { CartItem } from "./../models/cart-item.model";
import { ShoppingCartService } from "./../service/shopping-cart.service";
import { AuthService } from "./../service/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { auth } from "firebase/app";
import { Observable, of } from "rxjs";
import { switchMap, debounceTime, catchError } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  user;
  totalQuantity: number = 0;
  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router,
    private cartService: ShoppingCartService
  ) {
    afAuth.authState.subscribe(x => {
      console.log(x);
    });
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((items: CartItem[]) => {
      let cart = new ShoppingCart();
      cart.items = items;
      this.totalQuantity = cart.getItemstotalCount();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
