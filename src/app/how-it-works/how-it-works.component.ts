import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  public showSidebar = false;
  constructor() { }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('vendorToken');
    window.location.reload();
  }

}
