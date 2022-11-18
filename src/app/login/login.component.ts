import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { interval, lastValueFrom, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import env.prod
import { environment } from 'src/environments/environment.prod';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  @Input() homedL: boolean = false;
  public displayLogin: boolean=false;
  public display:boolean = false;
  public signup: boolean = false;
  public tnc: boolean = false;
  public subscription: Subscription;
  public user:any={
    uname:undefined,
    pass:undefined
  }
  public sDetails:any={
    "phone":"",
    "first_name":"",
    "last_name":"",
    "email":"",
    "password":"",
  }
  constructor(
    private auth: AuthService,
    private router: Router,
    private scroller: ViewportScroller,
    private http:HttpClient,
    private message:MessageService
    
  ) { 
    const source = interval(500);
     this.subscription = source.subscribe(val => {
      
      this.display=this.displayLogin&&this.homedL;
      // console.log(this.display);
  });

  
  }
  
  ngOnInit(): void {
    this.auth.isLoggedIn().then((response) => {
      // console.log(response);
      if(response==true) {
        this.displayLogin = false;
      }else{
        this.displayLogin = true;
      }
      this.display=this.displayLogin&&this.homedL;
    })

   
    
}

  

  login(){
    

    this.auth.login(this.user.uname,this.user.pass).subscribe(
      (response:any) => {
        console.log("response");
        
        console.log(response);
        //save it to localsotrage as token
        localStorage.setItem('token', response['user']);
        window.location.reload();
      },(err)=>{
        console.log("error occured");
        
        console.log(err);
      
        
      }
    );
  }

  verify(tnc:boolean,phone:string,first_name:string,last_name:string,email:string,password:string){
  //  check if tnc is true, if not return after adding a message to messageservice
  //  check if phone is valid, if not return after adding a message to messageservice
  //  check if first_name is valid, if not return after adding a message to messageservice
  //  check if last_name is valid, if not return after adding a message to messageservice
  //  check if email is valid, if not return after adding a message to messageservice
  //  check if password is valid, if not return after adding a message to messageservice
  console.log(tnc,phone,first_name,last_name,email,password);
  
  if(tnc==false){
    this.message.add({severity:'error', summary: 'Error', detail: "Please accept the terms and conditions"});
    return false;
  }
//  phone number validation 10 digit number string only with regex

  if(!/^[0-9]{10}$/.test(phone)){
    this.message.add({severity:'error', summary: 'Error', detail: "Please enter a valid phone number"});
    return false;
  }

  if(first_name.length<3){
    this.message.add({severity:'error', summary: 'Error', detail: "Please enter a valid first name"});
    return false;
  }
  if(last_name.length<3){
    this.message.add({severity:'error', summary: 'Error', detail: "Please enter a valid last name"});
    return false;
  }
//  email validation with regex
  if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
    this.message.add({severity:'error', summary: 'Error', detail: "Please enter a valid email"});
    return false;
  }
  
  // return true 
  return true;


}

  

  signUp(){
   if(! this.verify(this.tnc,this.sDetails.phone,this.sDetails.first_name,this.sDetails.last_name,this.sDetails.email,this.sDetails.password)){
    return ;
  }
   this.http.post(this.serverUrl+"user",{
    "phone":"+91"+this.sDetails.phone,
    "first_name":this.sDetails.first_name,
    "last_name":this.sDetails.last_name,
    "email":this.sDetails.email,
    "password":this.sDetails.password

   }).subscribe((res:any)=>{
      console.log(res);
      if(res["success"]){
        this.message.add({severity:'success', summary: 'Success', detail: res["message"]});
        window.location.reload();
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: res["message"]});
      }
    },
    (err:any)=>{
      console.log(err);
      this.message.add({severity:'error', summary: 'Error', detail: err["message"]});
    }
    );

  }
  

  togglesigninup(){
    this.signup = !this.signup;
  }
  
  scrolltoelement(id: string){
    console.log(id);
    // this.router.navigate([], { fragment: id });
    this.scroller.scrollToAnchor(id);
  }


}
