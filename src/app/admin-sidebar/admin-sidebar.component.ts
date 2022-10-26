import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public display: boolean = false;
  public activeLink: string = "";
  public pages:any=[
    {
      "name":"Dashboard",
      "icon":"fa fa-tachometer",
      "link":"/admin/dashboard"
    },
    {
      "name":"Users",
      "icon":"fa fa-users",
      "link":"/admin/users"
    },
    {
      "name":"Products",
      "icon":"fa fa-product-hunt",
      "link":"/admin/products"
    },
    {
      "name":"Orders",
      "icon":"fa fa-shopping-cart",
      "link":"/admin/orders"
    },
    {
      "name":"Deals",
      "icon":"fa fa-gift",
      "link":"/admin/deals"
    },
    {
      "name":"New Deal",
      "icon":"fa fa-plus",
      "link":"/admin/new-deal"
    },
    {
      "name":"Site Settings",
      "icon":"fa fa-cog",
      "link":"/admin/site-settings"
    },
    
  ];
  constructor(
    private router: Router
  ) { 
    this.getActiveLink();
  }

  ngOnInit(): void {
  }
  navigate(link:string){
    this.router.navigate([link]);
  }
  toggleSidebar(){
    this.display = !this.display;
  }
  getActiveLink(){
    this.activeLink = this.router.url;
    console.log(this.activeLink);
    
  }
  determineActiveLink(link:string){
    if(this.activeLink == link){
      return true;
    }else{
      return false;
    }
  }


}
