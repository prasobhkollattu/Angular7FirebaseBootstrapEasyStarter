import { DataTableResource } from "angular7-data-table";
import { Product } from "./../../models/product.model";
import { ProductService } from "./../../service/product.service";
import { CategoryService } from "./../../service/category.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  constructor(private productService: ProductService) {
    this.subscription = productService
      .getAll()
      .subscribe((products: Product[]) => {
        this.products = this.filteredProducts = products;
        this.initTable(this.products);
        console.log(products);
      });
  }
  private initTable(products: Product[]) {
    this.tableResource = new DataTableResource(this.products);
    this.tableResource.query({ offset: 0 }).then(items => {
      this.items = items;
    });
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = query
      ? this.filteredProducts.filter(p => {
          console.log(query);
          return p.title.toLowerCase().includes(query.toLowerCase());
        })
      : this.products;
    this.initTable(this.filteredProducts);
  }

  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => {
      this.items = items;
    });
  }
}
