import { CartItem } from "./../models/cart-item.model";
import { Component, Input } from "@angular/core";
import { Product } from "../models/product.model";
import { ShoppingCartService } from "../service/shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart.model";

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"]
})
export class ProductQuantityComponent {
  @Input("product") product: Product;
  @Input("showAction") showAction = true;
  constructor(private cartService: ShoppingCartService) {}

  @Input("shoppingCart") shoppingCart: ShoppingCart;
  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  get quantity() {
    if (this.shoppingCart) {
      let cartItem = this.shoppingCart.items.filter(cartItem => {
        return this.product.id == cartItem.product.id;
      });
      if (cartItem && cartItem.length > 0) {
        return (cartItem[0] as CartItem).quantity;
      }
    }
  }
}
