import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  create(product) {
    return this.firestore.collection("/products").add(product);
  }

  getAll() {
    return this.firestore
      .collection("/products")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getProduct(productId) {
    return this.firestore
      .doc("/products/" + productId)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.payload.data() as Product;
        })
      );
  }

  update(id, product) {
    return this.firestore.doc("/products/" + id).update(product);
  }

  delete(id) {
    return this.firestore.doc("/products/" + id).delete();
  }
}
