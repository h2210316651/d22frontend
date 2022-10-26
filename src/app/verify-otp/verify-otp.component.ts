import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import env,prod
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  public serverUrl=environment.serverUrl;
  public otp:any="";
  constructor(
    private http:HttpClient,
    private message:MessageService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  sendOtp(){
    this.http.post(this.serverUrl+'send-otp',{token:localStorage.getItem('token')}).subscribe((res:any)=>{
      console.log(res);
      
      if(res.success){
        this.message.add({severity:'success',summary:'Success',detail:res.message});
      }else{
        this.message.add({severity:'error',summary:'Error',detail:res.message});
      }
    },(err:any)=>{
      if(err.status==429){
        this.message.add({severity:'error',summary:'Error',detail:"Too many requests.Please wait 5 minutes before trying again."});
      }else{

      
      this.message.add({severity:'error',summary:'Error',detail:"Something went wrong"});
      }
      console.log(err);
      
    });
  }

  verifyOtp(){
    this.http.post(this.serverUrl+'verify-otp',{token:localStorage.getItem('token'),otp:this.otp}).subscribe((res:any)=>{
      if(res.success){
        this.message.add({severity:'success',summary:'Success',detail:res.message});
        this.router.navigate(['/']);
      }else{
        this.message.add({severity:'error',summary:'Error',detail:res.message});
      }
    },(err:any)=>{
      this.message.add({severity:'error',summary:'Error',detail:'Something went wrong'});
    });
  }

}
