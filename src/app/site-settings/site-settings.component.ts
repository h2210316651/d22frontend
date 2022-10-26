import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss']
})
export class SiteSettingsComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public settings:any={
    mainBanner:
    {
      "image":"",
      "title":"",
      "subtitle":""
    },

    subBanner1:undefined,
    subBanner2:undefined,


  };
  constructor(
    private http:HttpClient,
    private message:MessageService

  ) { }

  ngOnInit(): void {
    this.fetchSettings();
  }
  setb64(event:any,item:any){
    // convert image to 
    // console.log(this.newProduct.image);
    
    var reader = new FileReader();
    var file =event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(item=='mainBanner'){
       this.settings.mainBanner.image=reader.result as string;
      // console.log(this.deal.prizeImgb64);
      }

      if(item=='subBanner1'){
        this.settings.subBanner1 =reader.result as string;
      // console.log(this.deal.promoImgb64);
      }
      if(item=='subBanner2'){
        this.settings.subBanner2=reader.result as string;
      // console.log(this.deal.promoImgb64);
      }
      console.log(this.settings);
      
      
      
    }
  }
  checkb64(item:string){
    // if (item.contain)
    // check if item contains substring data:image
    if(item.includes("data:image")){
      return true;
    }
    return false;
  }

  validate(items:any){
    for(let item of items){
      if(item=="" || item==undefined || item==null){
        return false;
      }
    }
    return true;
  }
   saveSettings(){
    if(!this.validate([this.settings.mainBanner.image,this.settings.mainBanner.title,this.settings.mainBanner.subtitle,this.settings.subBanner1,this.settings.subBanner2])){
      this.message.add({severity:'error',summary:'Error',detail:'Please fill all the fields'});
      return;
    }
    this.http.post(this.serverUrl+"site-settings",{
      token:localStorage.getItem("adminToken"),
      settings:this.settings
    }).subscribe((res:any)=>{
      if(res["success"]==true){
        this.message.add({severity:'success',summary:'Success',detail:'Settings saved successfully'});
      }else{
        this.message.add({severity:'error',summary:'Error',detail:'Error saving settings'});
      }
      // console.log(res);
    },
    (err)=>{
      this.message.add({severity:'error',summary:'Error',detail:err.message});
    }
    );
  }

 fetchSettings(){
  // use a get request on 'site-settings' endpoint takes no params
  this.http.get(this.serverUrl+"site-settings").subscribe((res:any)=>{
    if(res["success"]==true){
      console.log(res);
      this.settings=res["data"];
    }else{
      this.message.add({severity:'error',summary:'Error',detail:'Error fetching settings'});
    }
    // console.log(res);
  },
  (err)=>{
    this.message.add({severity:'error',summary:'Error',detail:err.message});
  }
  
  );

}
}
