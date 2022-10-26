import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-dashbaord',
  templateUrl: './vendor-dashbaord.component.html',
  styleUrls: ['./vendor-dashbaord.component.scss']
})
export class VendorDashbaordComponent implements OnInit {
  public products:any=[];
  public dashboardStats:any=[
    {
      "name":"Total Products",
      "value":2,
      "route":"/vendor/products"
    },
    {
      "name":"Total Products on Platform",
      "value":0,
      "route":"/vendor/products"
    },
    {
      "name":"Total Orders",
      "value":0,
      "route":"/vendor/orders"
    },
    {
      "name":"Open Orders",
      "value":0,
      "route":"/vendor/orders"
    },
    {
      "name":"My sales on Platform",
      "value":0,
      "route":"/vendor/orders"
    }
    
  ];
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(path:string){
    this.router.navigate([path]);
  }

}
