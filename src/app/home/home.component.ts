import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public cartItems: any[] = [];
  public serverUrl = environment.serverUrl;
  public settings:any={}
  public displayCart:boolean=false;
  public displayL: boolean = true;
  public isLogged: boolean = false;
  public subbannerLeft="https://www.idealz.com/on/demandware.static/-/Library-Sites-IdealzSharedLibrary/default/dwb0a66136/images/newdesktop/homepage/webbanner-apt-english.png";
  public subbannerRight="https://www.idealz.com/on/demandware.static/-/Library-Sites-IdealzSharedLibrary/default/dwf5fce872/images/newdesktop/homepage/Group%20283%403x.png";
  public soldOuts:any=[
    
  ];
  public winners:any=[
   
  ];
  public responsiveOptions:any;
  public campaigns:any=[
    {
      "id":1,
      "name":"Campaign 1",
      "product_name":"Thumbs Up 200 ml",
      "prizeName":"Studio apartment in Dubai",
      "price":"INR 20.00",
      "priceinINR":20.00,
      "max_draw_date":"22 November, 2022",
      "units_sold":100,
      "total_units":1000,
      "extra":"Just Launched",
      "image":"https://www.idealz.com/on/demandware.static/-/Sites-idealz-master-catalog/default/dw21f477a6/images/LS-00087-dashboard-image11.png"
    },
    {
      "id":2,
      "name":"Campaign 2",
      "product_name":"Thumbs Up 650 ml",
      "prizeName":"Studio apartment in Dubai",
      "price":"INR 40.00",
      "priceinINR":40.00,
      "max_draw_date":"22 December, 2022",
      "units_sold":970,
      "total_units":1000,
      
      "image":"https://www.idealz.com/on/demandware.static/-/Sites-idealz-master-catalog/default/dw21f477a6/images/LS-00087-dashboard-image11.png"
    }
  ];
  public closingDeals:any=[
    {
      "id": 1,
      "name": "Thumbs Up 200ml",
      "units_sold": 100,
      "total_units": 1000,
      "prize":"15,000 cash",
      "image":"https://www.idealz.com/dw/image/v2/BDLZ_PRD/on/demandware.static/-/Sites-idealz-master-catalog/default/dw7d6a5604/images/combined/CG-01228-Combine.png?sw=834&sh=513"

    },
    {
      "id": 2,
      "name": "Thumbs Up 200ml",
      "units_sold": 300,
      "total_units": 1000,
      "prize":"15,000 cash",

      "image":"https://www.idealz.com/dw/image/v2/BDLZ_PRD/on/demandware.static/-/Sites-idealz-master-catalog/default/dw7d6a5604/images/combined/CG-01228-Combine.png?sw=834&sh=513"


    },
    {
      "id": 3,
      "name": "Thumbs Up 200ml",
      "units_sold": 400,
      "prize":"15,000 cash",

      "total_units": 1000,
      "image":"https://www.idealz.com/dw/image/v2/BDLZ_PRD/on/demandware.static/-/Sites-idealz-master-catalog/default/dw7d6a5604/images/combined/CG-01228-Combine.png?sw=834&sh=513"


    }, {
      "id": 4,
      "name": "Thumbs Up 200ml",
      "units_sold": 600,
      "total_units": 1000,
      "prize":"15,000 cash",

      "image":"https://www.idealz.com/dw/image/v2/BDLZ_PRD/on/demandware.static/-/Sites-idealz-master-catalog/default/dw7d6a5604/images/combined/CG-01228-Combine.png?sw=834&sh=513"


    }, {
      "id": 5,
      "name": "Thumbs Up 200ml",
      "units_sold": 801,
      "total_units": 1000,
      "prize":"15,000 cash",

      "image":"https://www.idealz.com/dw/image/v2/BDLZ_PRD/on/demandware.static/-/Sites-idealz-master-catalog/default/dw7d6a5604/images/combined/CG-01228-Combine.png?sw=834&sh=513"


    }
  ];
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private http:HttpClient,
    private message: MessageService
    
  ) {
    this.getCart();
    this.fetchSettings();
    this.getClosingDeals();
    this.getDeals();
    this.getSoldOuts();
    console.log((this.closingDeals[0]['units_sold']/this.closingDeals[0]['total_units']));
    
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

    this.auth.isLoggedIn().then((response) => {
      // console.log(response);
      if(response==true) {
        this.isLogged = true;
      }else{
        this.isLogged = false;
      }
    });
    
    let element = this.document.getElementById('home');
    
    

  }
  getPercentage(a:number){
    return a.toString()+"%";
  }
  getCart(){
    let cart:any = localStorage.getItem('cart');
    if(cart!=null || cart!=undefined){
    this.cartItems = JSON.parse(cart);
    }
  }
  calculateTotalProducts(){
    let tp=0;
    this.cartItems.forEach((item:any) => {
      tp+=item.quantity;
    });
    return tp;
  }

  subtractfromcart(id:any){
    // if the quantity is 1 then remove the item from cart
    let cart=this.cartItems;
    console.log(id);
    let index = cart.findIndex((item:any)=>item["deal_id"]==id);
    if(cart[index].quantity==1){
      cart.splice(index,1);
    }
    else{
      cart[index].quantity-=1;
    }
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  clearCart(){
    localStorage.removeItem('cart');
    this.cartItems=[];
  }

  incrementtocart(id:any){
    let cart=this.cartItems;
    console.log(id);
    
    let index = cart.findIndex((item:any)=>item["deal_id"]==id);
    // if index is not found then return
    if(index==-1){
      return;
    }
    cart[index].quantity+=1;
    localStorage.setItem('cart',JSON.stringify(cart));
  }


  addtoCart(item:any){
    let deal_id=item._id;
    // check if this.cartItems contains the deal_id if yes then increase the quantity else make an entry
    let cart = this.cartItems;
    let index = cart.findIndex((x:any)=>x.deal_id==deal_id);
    if(index!=-1){
      cart[index].quantity = cart[index].quantity+1;
    }else{
      cart.push({
        deal_id:deal_id,
        image:this.serverUrl+item.product_image,
        quantity:1,
        name:item.product_name,
        prize_name:item.prize_name,
        price:item.buy_price,
      });
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    this.getCart();
    console.log(this.cartItems);
    
  }
  getClosingDeals(){
    this.http.get(this.serverUrl+'closing-deals').subscribe((response:any)=>{
      if(response['success']==true){
        this.closingDeals=response["data"];
      console.log(response);
      }else{
        this.message.add({severity:'error', summary:'Error', detail:response['message']});
      }
      
    },(error)=>{
      // console.log(error);
      this.message.add({severity:'error', summary:'Error', detail:error['message']});
    })
  }
  getDeals(){
    this.http.get(this.serverUrl+'deals').subscribe((response:any)=>{
      console.log(response);
      if(response["success"]){
        this.campaigns = response["data"]["deals"];
        this.campaigns.forEach((item:any) => {
          item["stub"]="Buy-a-"+item["product_name"].toString().replace(" ","-")+"-and-win-"+item["prize_name"].toString().replace(" ","-")+'.-Exclusively-on-dealz22';
        });
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: response["message"]});
      }
    },
    (error)=>{
      this.message.add({severity:'error', summary: 'Error', detail: error});
    }
    );
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
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
    console.log(this.serverUrl+this.settings.mainBanner.image);

      // console.log(res);
    },
    (err)=>{
      this.message.add({severity:'error',summary:'Error',detail:err.message});
    }
    
    );
  
  }

  getSoldOuts(){
    this.http.get(this.serverUrl+'sold-out').subscribe((response:any)=>{
      if(response['success']==true){
        this.soldOuts=response["deals"];
        let winners:any=[];
        response["deals"].forEach((item:any)=>{
          if(
            item["winner_id"]!=null && item["winner_name"]!=null
          ){
            winners.push(item);
          }
        });
        this.winners=winners;
      console.log(response);
      }else{
        this.message.add({severity:'error', summary:'Error', detail:response['message']});
      }
      
  
    },(err:any)=>{

    this.message.add({severity:'error', summary: 'Error', detail: "There was an error fetching sold out deals"});
  }
  
  );
}
  ngOnInit(): void {

  }

}
