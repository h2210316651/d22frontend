import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import production environment
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public user: any = {
    "phone": "",
    "password": "",
    "otp": ""
  }
  public serverUrl = environment.serverUrl;

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  sendOtp() {
    // send otp to user
    // check if phone number is of format +91xxxxxxxxxx
    // if yes then send otp
    // else show error
    console.log(this.user.phone);
    
    if (this.user.phone.toString().length == 10) {
      this.http.post(this.serverUrl + 'send-otp-reset-password', { phone: "+91" + this.user.phone.toString() }).subscribe((res: any) => {
        if (res.success) {
          this.message.add({ severity: 'success', summary: 'Success', detail: res.message });
        } else {
          this.message.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      }, (err: any) => {
        this.message.add({ severity: 'error', summary: 'Error', detail: err.message });
      });

    }else{
      this.message.add({ severity: 'error', summary: 'Error', detail: "Please enter a valid phone number" });
    }



  }

  verifyOtp() {
    // verify otp
    this.http.post(this.serverUrl + 'verify-otp-reset-password', { phone: "+91" + this.user.phone.toString(), otp: this.user.otp, password: this.user.password }).subscribe((res: any) => {
      if (res.success) {
        this.message.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.router.navigate(['/']);
      } else {
        this.message.add({ severity: 'error', summary: 'Error', detail: res.message });
      }
     }, (err: any) => { 
        this.message.add({ severity: 'error', summary: 'Error', detail: err.message });
     });
  }



}
