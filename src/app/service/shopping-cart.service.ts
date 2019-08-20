import { ShoppingCart } from "./../models/shopping-cart.model";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { CartItem } from "./../models/cart-item.model";
import { Product } from "./../models/product.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private firestore: AngularFirestore) {}

  private createsc() {
    return this.firestore
      .collection("/shopping-cart")
      .add({ dateCreated: new Date().getTime() });
  }
  getCart() {
    this.getOrCreateCartId();
    let cartId = this.getCartId();
    console.log("cartId " + cartId);
    return this.firestore
      .doc("/shopping-cart/" + cartId)
      .collection("items")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as CartItem;
            return data;
          });
        })
      );
  }

  getCartId() {
    return localStorage.getItem("cartId");
  }
  async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
    let result = await this.createsc();
    cartId = result.id;
    localStorage.setItem("cartId", cartId);
    console.log("cartId " + cartId);
    return cartId;
  }

  private getCartItem(cartId, productId) {
    return this.firestore
      .doc("/shopping-cart/" + cartId + "/items/" + productId)
      .snapshotChanges();
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let cartItem: CartItem;
    let sub = await this.getCartItem(cartId, product.id).subscribe(ci => {
      cartItem = ci.payload.data() as CartItem;
      if (cartItem && cartItem.quantity) {
        this.firestore
          .doc("/shopping-cart/" + cartId + "/items/" + product.id)
          .update({ quantity: (cartItem as CartItem).quantity + 1 });
      } else {
        this.firestore
          .doc("/shopping-cart/" + cartId + "/items/" + product.id)
          .set({
            product: product,
            quantity: 1
          });
      }

      sub.unsubscribe();
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let cartItem: CartItem;
    let sub = await this.getCartItem(cartId, product.id).subscribe(ci => {
      cartItem = ci.payload.data() as CartItem;

      if (cartItem && cartItem.quantity) {
        this.firestore
          .doc("/shopping-cart/" + cartId + "/items/" + product.id)
          .update({ quantity: (cartItem as CartItem).quantity - 1 });
      }
      sub.unsubscribe();
    });
  }

  async removeAllCart(cartItems: CartItem[]) {
    let cartId = await this.getOrCreateCartId();
    cartItems.forEach(item => {
      this.firestore
        .doc("/shopping-cart/" + cartId + "/items/" + item.product.id)
        .delete();
      console.log(item.product.id);
    });
  }
}
