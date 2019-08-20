import { CartItem } from "./../models/cart-item.model";
import { ShoppingCart } from "./../models/shopping-cart.model";
import { ShoppingCartService } from "./../service/shopping-cart.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shpping-cart",
  templateUrl: "./shpping-cart.component.html",
  styleUrls: ["./shpping-cart.component.css"]
})
export class ShppingCartComponent implements OnInit {
  cart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cart = new ShoppingCart();
      this.cart.items = items;
      console.log("ngOnInit ");
    });
  }

  getItemstotalCount(): number {
    if (this.cart) {
      return this.cart.getItemstotalCount();
    }

    return 0;
  }
  clearCart() {
    console.log("clearCart");
    this.cartService.removeAllCart(this.cart.items);
  }
}
