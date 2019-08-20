import { ShoppingCartService } from "./../../service/shopping-cart.service";
import { ShoppingCart } from "./../../models/shopping-cart.model";
import { CartItem } from "./../../models/cart-item.model";
import { Product } from "./../../models/product.model";
import { ProductService } from "./../../service/product.service";
import { map } from "rxjs/operators";
import { Category } from "./../../models/category.model";
import { CategoryService } from "./../../service/category.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { take } from "rxjs/operators";
@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  product: any = [];
  id;
  cart: ShoppingCart;
  constructor(
    private service: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    service.getCategories().subscribe((categories: Category[]) => {
      this.category = categories;
      console.log(this.category);
    });

    this.id = this.route.snapshot.paramMap.get("id");

    if (this.id) {
      this.productService.getProduct(this.id).subscribe(p => {
        console.log(p);

        this.product = p;
      });
    }
  }

  private category: Category[];

  get categories() {
    if (this.category && this.category.length > 0) {
      return this.category[0].category.split(",");
    }
  }
  async ngOnInit() {
    this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cart = new ShoppingCart();
      this.cart.items = items;
    });
  }

  save(product) {
    console.log(product);
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure to delete?")) return;
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
