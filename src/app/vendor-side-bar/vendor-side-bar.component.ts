import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-side-bar',
  templateUrl: './vendor-side-bar.component.html',
  styleUrls: ['./vendor-side-bar.component.scss']
})
export class VendorSideBarComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  navigate(route:string){
    this.router.navigate([route]);
  }
}
