import { Product } from "./product.model";
export class CartItem {
  constructor(public quantity: number, public product: Product) {}
}
