import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// get env.prod
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public emailVerified = false;
  public otpVerfied = false;
  public first_name = '';
  public last_name = '';
  public email = '';
  public phone = '';
  public tokens=0;
  public progressValue = 0;
  public profilePic = '';
  public photoUrl="";
  public wonDeals:any=[];
  public address:any={
    "house_number":"",
    "street":"",
    "city":"",
    "state":"",
    "pincode":"",
    "landmark":"",

  }
  constructor(
    private http:HttpClient,
    private message:MessageService
  ) { }

  ngOnInit(): void {
    this.getUserSettings()
  }
  logout(){
    localStorage.clear();
    window.location.href = '/';
  }

  getPercentage(){
    this.progressValue = 0;
    // get each key from address
    let keys = Object.keys(this.address);
    keys.forEach((key:any)=>{
      if(this.address[key] != ''){
        this.progressValue += 5;
      }
    });
    if(this.emailVerified){
      this.progressValue += 35;
    }
    if(this.otpVerfied){
      this.progressValue += 35;
    }
  }

  setb64(event:any){
    // convert image to 
    // console.log(this.product.image);
    
    var reader = new FileReader();
    var file =event.target.files[0];
    // find file type
    var fileType = file.type;
    // if file is not an image throw error
    if(fileType.indexOf('image') == -1){
      this.message.add({severity:'error', summary:'Error', detail:'Please select an image'});
      return;
    }
    // if file size id greater than 1mb throw error
    if(file.size > 1000000){
      this.message.add({severity:'error', summary:'Error', detail:'Image size should be less than 1mb'});
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.profilePic = reader.result as string;
      console.log(this.profilePic);
      this.http.post(this.serverUrl + 'profile-pic',{
        "token":localStorage.getItem('token'),
        "profile_pic":this.profilePic
      }).subscribe((res:any)=>{

        if(res.success == true){
          console.log(res);
          
          this.message.add({severity:'success', summary:'Success', detail:'Profile pic updated successfully'});
          this.getUserSettings();
        }
      },(err)=>{
        console.log(err);
        
        this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
      });
      
    }
  }


  getUserSettings(){
    this.http.get(this.serverUrl + 'user/?token='+localStorage.getItem('token')).subscribe((res:any)=>{
      console.log(res);
    this.getWonDeals();
      
      if(res.success){
        this.address = res.user.address;
        this.first_name = res.user.first_name;
        this.last_name = res.user.last_name;
        this.email = res.user.email;
        this.phone = res.user.phone;
        this.emailVerified = res.user.email_verified;
        this.otpVerfied = res.user.otp_verified;
        this.tokens = res.user.tokens;
        if(res.user.photo!=null && res.user.photo!=undefined){
          this.photoUrl = this.serverUrl + res.user.photo;
          console.log(this.photoUrl);
          
        }
        
        this.getPercentage();
        console.log(this.emailVerified,this.otpVerfied);
        

      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }

    },(err)=>{
    this.getWonDeals();

  }
  );}

  saveProfile(){
    console.log(this.address);
    this.http.put(this.serverUrl + 'user',{
      "first_name":this.first_name,
      "last_name":this.last_name,
      "token":localStorage.getItem('token')
    }).subscribe((res:any)=>{
      if(res.success){
        this.getUserSettings();
        this.message.add({severity:'success', summary:'Success', detail:"Profile updated successfully"});
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
  },(err)=>{
    this.message.add({severity:'error', summary:'Error', detail:"Something went wrong"});
  }
  
  );
  }

  saveAddress(){
    console.log(this.address);
    this.http.put(this.serverUrl + 'user',{
      "address":this.address,
      "token":localStorage.getItem('token')
    }).subscribe((res:any)=>{
      if(res.success){
        this.getUserSettings();
        this.message.add({severity:'success', summary:'Success', detail:"Address updated successfully"});
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
  },(err)=>{
    this.message.add({severity:'error', summary:'Error', detail:"Something went wrong"});
  }
  
  );
}

getWonDeals(){
  this.http.get(this.serverUrl + 'won-deals/?token='+localStorage.getItem('token')).subscribe((res:any)=>{
    if(res.success){
      this.wonDeals = res.data.won_deals;
      console.log(this.wonDeals);
      
    }else{
      
    }
  },(err)=>{
  });
}


}
