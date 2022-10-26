import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Dealz 22';
  message:any = null;

  constructor(
    private messageService: MessageService,
    private http:HttpClient,
    private router:Router
  ){}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
          //  console.log("Hurraaa!!! we got the token.....");
          //  console.log(currentToken);
          // if current route is not root then return
          if(this.router.url!="/"){
            console.log("not root");
            
            return;
          }
          this.http.post(environment.serverUrl+"fcm-token",{fcm_token:currentToken,token:localStorage.getItem("token")}).subscribe((res:any)=>{
              console.log(res);
              
              if(res["success"]){
                
                // this.messageService.add({severity:'success', summary: 'Success', detail: res["message"]});
              }else{
                // this.messageService.add({severity:'error', summary: 'Error', detail: res["message"]});
              }
            },(err)=>{
              console.log(err);
              // this.messageService.add({severity:'error', summary: 'Error', detail: err["message"]});
            });
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload:any) => {
      console.log('Message received. ', payload);
      this.message=payload;
      this.messageService.add({severity:'success', summary:payload["notification"]["title"], detail:payload["notification"]["body"]}); });
  }
}
