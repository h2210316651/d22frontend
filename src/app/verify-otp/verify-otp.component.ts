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
  public otp_email:any="";
  public otp_verified:any=false;
  public email_verified:any=false;
  constructor(
    private http:HttpClient,
    private message:MessageService,
    private router:Router
  ) { }

  ngOnInit(): void {
  this.checkVerified();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  checkVerified(){
    this.http.get(this.serverUrl+'otp-verified/?token='+localStorage.getItem("token")).subscribe((res:any)=>{
      if(res.success){
        this.otp_verified=true;
        this.otp="  ";
      }
    
  },(err:any)=>{
    if(err.status==401){
      this.router.navigate(['/']);
    }
  });

  this.http.get(this.serverUrl+'email-verified/?token='+localStorage.getItem("token")).subscribe((res:any)=>{
    if(res.success){
      this.email_verified=true;
      this.otp_email="  ";

    }
  
},(err:any)=>{
  if(err.status==401){
    this.router.navigate(['/']);
  }
});


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
    this.http.post(this.serverUrl+'verify-otp',{token:localStorage.getItem('token'),otp:this.otp,otp_email:this.otp_email}).subscribe((res:any)=>{
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
