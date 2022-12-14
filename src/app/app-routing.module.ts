import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDealsComponent } from './admin-deals/admin-deals.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNewDealComponent } from './admin-new-deal/admin-new-deal.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { BuyTokensComponent } from './buy-tokens/buy-tokens.component';
import { CartComponent } from './cart/cart.component';
import { DealComponent } from './deal/deal.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PolicyComponent } from './policy/policy.component';
import { SettingsComponent } from './settings/settings.component';
import { ShippingPolicyComponent } from './shipping-policy/shipping-policy.component';
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
    path:"deal/:id/:stub",
    pathMatch: "full",
    component:DealComponent
  },
  {
    path:"buy-tokens",
    pathMatch: "full",
    component:BuyTokensComponent
  },
  {
    path:"shipping-policy",
    pathMatch: "full",
    component:ShippingPolicyComponent
  },
  {
    // forgot password
    path:"forgot-password",
    pathMatch: "full",
    component:ForgotPasswordComponent
  },
  {
    path:"about-us",
    pathMatch: "full",
    component:AboutUsComponent
  },
  {
    path:"how-it-works",
    pathMatch: "full",
    component:HowItWorksComponent
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
