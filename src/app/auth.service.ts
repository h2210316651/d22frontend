import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import production environment
import { environment } from 'src/environments/environment.prod';
//import lastvaluefrom from rxjs
import { lastValueFrom } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = environment.serverUrl;
  constructor(
    private http:HttpClient,
    private router:Router,
    private message:MessageService
    ) {

      this.checkLoginandRedirect();
     }

     async checkLoginandRedirect() {
      let loggedin=await this.isLoggedIn();
      if (loggedin){
        this.isOtpVerified();
      }

      
    }

  login(username: string, password: string) {
    let loginUrl = this.serverUrl + 'login';
    // TODO: call login API with username and password as body
   return this.http.post(loginUrl, {phone: username, password: password});
  }

  isOtpVerified(){
    // if activated route contains admin return
    if(this.router.url.includes('admin')||this.router.url.includes('vendor')){
      return;
    }

    let token = localStorage.getItem('token');
    if(token) {
      let verifyUrl = this.serverUrl + 'otp-verified/?token=' + token;

        this.http.get(verifyUrl).subscribe((res:any)=>{
          
          if(res["success"]){
          //  this.message.add({severity:'success',summary:'Success',detail:res.message});
           this.router.navigate(['/']);

          }
          else{
            this.message.add({severity:'error',summary:'Error',detail:res.message});
            this.router.navigate(['/otp']);
          }
        },(err:any)=>{
          this.message.add({severity:'error',summary:'Error',detail:'Something went wrong'});
          console.log(err);
          this.router.navigate(['/otp']);
          
        });
    } else{
      
    }
  }

  async isLoggedIn() {
    // check if token is present in localstorage
    let token = localStorage.getItem('token');
    if(token) {
      //verify token
      let verifyUrl = this.serverUrl + 'verify/?token=' + token;
      let response = await lastValueFrom(this.http.get(verifyUrl));
      // console.log(response);
      // get active route
      let activeRoute = this.router.url;
      console.log(activeRoute);
      
      if(response==true) {
        return true;
      }else{
        return false;
      }
    } else{
      return false;
    }
  
  }





}
