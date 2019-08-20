import { CartItems } from "./../models/cart-items.model";
import { CartItem } from "./../models/cart-item.model";
import { ShoppingCartService } from "./../service/shopping-cart.service";
import { ShoppingCart } from "./../models/shopping-cart.model";
import { ActivatedRoute } from "@angular/router";
import { Product } from "./../models/product.model";
import { ProductService } from "./../service/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  cart: ShoppingCart;
  selectedCategory: string;
  filteredProducts: Product[] = [];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {
    productService.getAll().subscribe((products: Product[]) => {
      this.products = products;

      route.queryParamMap.subscribe(params => {
        this.selectedCategory = params.get("category");

        this.filteredProducts = this.selectedCategory
          ? this.products.filter(p => p.category === this.selectedCategory)
          : this.products;
      });
    });
  }

  async ngOnInit() {
    this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cart = new ShoppingCart();
      this.cart.items = items;
    });
  }
}
