import { Category } from "./../../models/category.model";
import { CategoryService } from "./../../service/category.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"]
})
export class ProductFilterComponent implements OnInit {
  categories: string[] = [];
  @Input("selectedCategory") selectedCategory;
  constructor(categoryService: CategoryService) {
    categoryService.getCategories().subscribe((categories: Category[]) => {
      if (categories && categories.length > 0) {
        this.categories = categories[0].category.split(",");
      }
    });
  }

  ngOnInit() {}
}
