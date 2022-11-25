import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {
  @Input() showSidebar=false;
  constructor() { }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('vendorToken');
    window.location.reload();
  }
  ngOnInit(): void {
  }

}
