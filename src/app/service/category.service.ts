import { Category } from "./../models/category.model";
import { element } from "protractor";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}

  getCategories() {
    return this.firestore
      .collection("/categories")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Category;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }
}
