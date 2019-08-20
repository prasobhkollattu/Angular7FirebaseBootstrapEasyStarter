import { LoginRedirectGuard } from "./service/login-redirect-guard.service";
import { ShoppingCartService } from "./service/shopping-cart.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { CategoryService } from "./service/category.service";
import { AuthAdminGuard } from "./service/auth-admin-guard.service";
import { AuthGuard } from "./service/auth-guard.service";
import { AuthService } from "./service/auth.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { LoginComponent } from "./login/login.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { environment } from "./../environments/environment";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShppingCartComponent } from "./shpping-cart/shpping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { FormsModule } from "@angular/forms";
import { ProductService } from "./service/product.service";
import { CustomFormsModule } from "ng2-validation";
import { DataTableModule } from "angular7-data-table";
import { ProductFilterComponent } from "./products/product-filter/product-filter.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductQuantityComponent } from "./product-quantity/product-quantity.component";
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      { path: "", component: ProductsComponent },
      {
        path: "products",
        component: ProductsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "shoping-cart",
        component: ShppingCartComponent
      },
      {
        path: "order-success",
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [LoginRedirectGuard]
      },

      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      },
      {
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AuthAdminGuard]
      },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuard]
      }
    ]),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthAdminGuard,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
