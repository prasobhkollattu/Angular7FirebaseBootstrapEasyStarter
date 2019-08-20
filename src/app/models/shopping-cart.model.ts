import { Product } from "./product.model";
import { CartItem } from "./cart-item.model";
import { CartItems } from "./cart-items.model";

export class ShoppingCart {
  items: CartItem[] = [];
  dateCreated: string;
  constructor() {}

  getItemstotalCount(): number {
    let totalQuantity: number = 0;
    this.items.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
    });

    return totalQuantity;
  }

  getQuantity(product: Product) {
    let quantity = 0;
    this.items
      .filter(item => {
        return item.product.id == product.id;
      })
      .forEach(item => {
        quantity = quantity + item.quantity;
      });

    return quantity;
  }
  get totalPrice() {
    let totalPrice: number = 0;
    this.items.forEach(item => {
      totalPrice = totalPrice + item.product.price * item.quantity;
    });

    return totalPrice;
  }
}
