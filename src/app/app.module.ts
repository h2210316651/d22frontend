import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {CarouselModule} from 'primeng/carousel';
import {TooltipModule} from 'primeng/tooltip';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BlockUIModule} from 'primeng/blockui';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { VendorDashbaordComponent } from './vendor-dashbaord/vendor-dashbaord.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { VendorProductsComponent } from './vendor-products/vendor-products.component';
import { VendorNewProductComponent } from './vendor-new-product/vendor-new-product.component';
import { VendorSideBarComponent } from './vendor-side-bar/vendor-side-bar.component';
import { VendorOrdersComponent } from './vendor-orders/vendor-orders.component';
import {DividerModule} from 'primeng/divider';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminDealsComponent } from './admin-deals/admin-deals.component';
import { AdminNewDealComponent } from './admin-new-deal/admin-new-deal.component';
import {ChartModule} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { ZNotFoundComponent } from './z-not-found/z-not-found.component';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { initializeApp } from "firebase/app";
// import evrionment.prod
import { environment } from 'src/environments/environment.prod';
import {AccordionModule} from 'primeng/accordion';
import { PolicyComponent } from './policy/policy.component';
import { TncComponent } from './tnc/tnc.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SettingsComponent } from './settings/settings.component';
import { FaqsComponent } from './faqs/faqs.component';
initializeApp(environment.firebase);
// get inputtext from primeng
let primeImports=[
  DialogModule,
  ButtonModule,
  InputTextModule,
  CheckboxModule,
  ProgressBarModule,
  CarouselModule,
  TooltipModule,
  OverlayPanelModule,
  BlockUIModule,
  ToastModule,
  DividerModule,
  SidebarModule,
  ChartModule,
  TableModule,
  DropdownModule,
  CalendarModule,
  InputNumberModule,
  AccordionModule
];
let angImports=[
  BrowserAnimationsModule,
  NgCircleProgressModule.forRoot({
    
  })
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VendorLoginComponent,
    VendorDashbaordComponent,
    VendorProductsComponent,
    VendorNewProductComponent,
    VendorSideBarComponent,
    VendorOrdersComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminDealsComponent,
    AdminNewDealComponent,
    ZNotFoundComponent,
    SiteSettingsComponent,
    CartComponent,
    OrdersComponent,
    PolicyComponent,
    TncComponent,
    VerifyOtpComponent,
    SettingsComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ...primeImports,
    ...angImports
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
