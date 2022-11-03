import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDealsComponent } from './admin-deals/admin-deals.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNewDealComponent } from './admin-new-deal/admin-new-deal.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CartComponent } from './cart/cart.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PolicyComponent } from './policy/policy.component';
import { SettingsComponent } from './settings/settings.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { TncComponent } from './tnc/tnc.component';
import { VendorDashbaordComponent } from './vendor-dashbaord/vendor-dashbaord.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { VendorNewProductComponent } from './vendor-new-product/vendor-new-product.component';
import { VendorOrdersComponent } from './vendor-orders/vendor-orders.component';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ZNotFoundComponent } from './z-not-found/z-not-found.component';

const routes: Routes = [
 {
    path:"",
    component: HomeComponent,
    pathMatch: "full"
  },{
    path:"vendor/login",
    component: VendorLoginComponent,
    pathMatch: "full"

  },{
    path:"vendor/dashboard",
    component: VendorDashbaordComponent,
    pathMatch: "full"
  },
  {
    path:"vendor/products",
    component: VendorProductsComponent,
    pathMatch: "full"
  },
  {
    path:"vendor/new-product",
    component: VendorNewProductComponent,
    pathMatch: "full"
  },
  {
    path:"vendor/orders",
    component: VendorOrdersComponent,
    pathMatch: "full"
  },{
    path:"admin/login",
    component: AdminLoginComponent,
    pathMatch: "full"
  },{
    path:"admin/dashboard",
    component: AdminDashboardComponent,
    pathMatch: "full"
  },{
    path:"admin/users",
    component: AdminUsersComponent,
    pathMatch: "full"
  },{
    path:"admin/products",
    component: AdminProductsComponent,
    pathMatch: "full"
  },{
    path:"admin/orders",
    component: AdminOrdersComponent,
    pathMatch: "full"
  },{
    path:"admin/deals",
    component: AdminDealsComponent,
    pathMatch: "full"
  },{
    path:"admin/new-deal",
    component: AdminNewDealComponent,
    pathMatch: "full"
  },{
    path:"admin/site-settings",
    component: SiteSettingsComponent,
    pathMatch: "full"
  },
  {
    path:"cart",
    component: CartComponent,
    pathMatch: "full"
  }
  ,
  {
    path:"orders",
    component: OrdersComponent,
    pathMatch: "full"
  },
  {
    path:"privacy-policy",
    component: PolicyComponent,
    pathMatch: "full"
  },
  {
    path:"user-agreement",
    component: TncComponent,
    pathMatch: "full"
  }
  ,
  {
    path:"otp",
    component: VerifyOtpComponent,
    pathMatch: "full"
  },
  {
    path:"settings",
    pathMatch: "full",
    component: SettingsComponent
  }
  ,
  {
    path:"faqs",
    pathMatch: "full",
    component:FaqsComponent
  },
  {
    path:"**",
    component: ZNotFoundComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
