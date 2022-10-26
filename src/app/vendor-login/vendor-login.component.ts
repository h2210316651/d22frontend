import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.scss']
})
export class VendorLoginComponent implements OnInit {
  public username:any;
  public password:any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }
  login(){
    this.auth.login(this.username, this.password).subscribe((response:any)=>{
      if(response.success==true){
        console.log(response);
        if(response.role=="vendor"){
        localStorage.setItem('vendorToken', response.user);
          
          this.router.navigate(['/vendor/dashboard']);
      }else{
        this.messageService.add({severity:'error', summary:'Error', detail:'This page is only for vendors.'});
        this.router.navigate(['/']);
      }
    }
    }, (error:any)=>{
      console.log(error);
      this.messageService.add({severity:'error', summary:'Error', detail:"Error: "+error.name+". Details: " +error.statusText,sticky:true});
    });
  }

}
