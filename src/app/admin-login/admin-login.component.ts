import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public user:any={
    "username":undefined,
    "password":undefined
  };
  constructor(
    private auth:AuthService,
    private messageService: MessageService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  login(){
    this.auth.login(this.user.username,this.user.password).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.success==true && res.role=="admin"){
          this.messageService.add({severity:'success', summary: 'Success', detail: res.message});
          localStorage.setItem("adminToken",res.user);
          this.router.navigate(["/admin/dashboard"]);
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
        }
      },
      (err)=>{
        console.log(err);
        this.messageService.add({severity:'error', summary: 'Error', detail: err.message});
      }
    );
  }

}
