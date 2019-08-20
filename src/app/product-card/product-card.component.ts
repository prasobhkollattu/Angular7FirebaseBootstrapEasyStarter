import { CartItem } from "./../models/cart-item.model";
import { Product } from "./../models/product.model";
import { Component, OnInit, Input } from "@angular/core";
import { ShoppingCartService } from "../service/shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart.model";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent {
  @Input("product") product: Product;
  @Input("showAction") showAction = true;
  @Input("imageHeightInPx") imageHeightInPx: number = 200;
  constructor(private cartService: ShoppingCartService) {}

  @Input("shoppingCart") shoppingCart: ShoppingCart;
  addToCart() {
    this.cartService.addToCart(this.product);
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
