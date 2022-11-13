import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from 'src/environments/environment.prod';
declare var Razorpay: any;
// declare var message:MessageService;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public cartItems:any[]=[];
  public campaigns:any=[];
  public shippingAddress:any={};
  public tokens=0;
  public useTokens=false;
  constructor(
    private http:HttpClient,
    private message:MessageService,
    private router:Router

  ) {
    message=this.message;
   }

  ngOnInit(): void {
    this.getUserSettings();
    this.getCart();
    this.getDeals();
    if(this.cartItems.length>0){
      this.validateCart();
    }
  }
  getTotalPrice(){
    let total=0;
    this.campaigns.forEach((campaign:any)=>{
      total+=campaign.buy_price*campaign.quantity;
    });
    return total;
  }
  calculateMaxDiscount(){
    let discount=0;
    this.campaigns.forEach((cartItem:any)=>{
      discount+=cartItem.deals22token_cap*cartItem.quantity*cartItem.deals22token_value;
    });
    return discount;
  }

  getUserSettings(){
    this.http.get(this.serverUrl + 'user/?token='+localStorage.getItem('token')).subscribe((res:any)=>{
      console.log(res);
      
      if(res.success){
        this.shippingAddress = res.user.address;
        this.tokens = res.user.tokens;
        

      }else{
      }

    },(err)=>{

  }
  );}

  validateShippingAddress(){
    if(this.shippingAddress==undefined || this.shippingAddress==null || this.shippingAddress==''){
      return false;
    }else{
      return true;
    }

  }
  handler(response:any){
    console.log("handler ran");
    
    // verify the transaction
    this.http.post(this.serverUrl+'verify-transaction',{
      "razorpay_payment_id":response.razorpay_payment_id,
      "order_id":response.razorpay_order_id,
      "razorpay_signature":response.razorpay_signature,
   
    }).subscribe((res:any)=>{
      if(res.success){
        // window.alert("Payment Successful");
        // clear the cart
        localStorage.removeItem('cart');
        this.cartItems=[];
        this.campaigns=[];
        this.router.navigate(['/orders']);
        // route using window location
        window.location.href = '/orders';

        // message.add({severity:'success', summary:'Success', detail:'Payment Successful'});
      }else{
        // message.add({severity:'error', summary:'Error', detail:res.message});
        window.alert("Payment Failed "+res.message);
      }
    },
    (err:any)=>{
      // this.message.add({severity:'error', summary:'Error', detail:err.message});
      window.alert("Payment Failed "+err.message);
    }
    );
    // this.message.add({severity:'success', summary:'Success', detail:'Payment Id'+response.razorpay_payment_id});
    console.log(response.razorpay_payment_id);
    
  }
  checkOut0(){
    let a=this.validateShippingAddress();
    if(!a){
      this.message.add({severity:'error', summary:'Error', detail:'Please enter a valid shipping address'});
      return;
    }
    this.http.post(this.serverUrl+'order',{
      token:localStorage.getItem('token'),
      cart:this.cartItems,
      shipping_address:{"street_address":this.shippingAddress}
    }).subscribe((res:any)=>{
      if(res["success"]){
        this.message.add({severity:'success', summary:'Success', detail:"Your signup has been verified, Stay tuned for winner announcement",sticky:true});
        // this.router.navigate(['/orders']);
        localStorage.removeItem('cart');
        window.location.reload();
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res["message"]});
      }
    },
    (err)=>{
      this.message.add({severity:'error', summary:'Error', detail:err.message});
    }
    );
  }
  checkout(){
    if (this.useTokens){
      this.cartItems.forEach((cartItem:any)=>{
        cartItem.use_tokens=true;
      });
    }
    let a=this.validateShippingAddress();
    if(!a){
      this.message.add({severity:'error', summary:'Error', detail:'Please enter a valid shipping address'});
      return;
    }

    // place the order and save the order_id
    this.http.post(this.serverUrl+'order',{
      token:localStorage.getItem('token'),
      cart:this.cartItems,
      shipping_address:{"street_address":this.shippingAddress}
    }).subscribe((res:any)=>{
      if(res.success){
        this.message.add({severity:'success', summary:'Success', detail:res.message});
        console.log(this.message);
        let options={
          "handler":this.handler.bind(this),
        //   "handler": function (response:any){
        //     // alert(response.razorpay_payment_id);
        //     // alert(response.razorpay_order_id);
        //     // alert(response.razorpay_signature)
            
        // },
        "key": "rzp_test_lH4coxwAfyfIBJ",
        "currency": "INR",
        "name": "Deals 22",
        "description": "Test Transaction",
        "order_id": res.data.order_id,
        }
        let rzp1=new Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response:any){
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
  });
        
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message,sticky:true});
      }
    }
    ,(err:any)=>{
      this.message.add({severity:'error', summary:'Error', detail:err.message});
    });
  }
  getDeals(){
    this.http.get(this.serverUrl+'deals').subscribe((response:any)=>{
      console.log(response);
      if(response["success"]){
        this.campaigns = response["data"]["deals"];
        // remove all campaings where the _id is not in the cart as deal_id
        this.campaigns = this.campaigns.filter((campaign:any) => {
          return this.cartItems.some((cartItem:any) => {
            return cartItem.deal_id == campaign._id;
          });
        // get the appropriate quantity from the cartItems
        

        });
        this.campaigns = this.campaigns.map((campaign:any) => {
          let cartItem = this.cartItems.find((cartItem:any) => {
            return cartItem.deal_id == campaign._id;
          });
          campaign.quantity = cartItem.quantity;
          return campaign;
        });
        
        console.log(this.campaigns);
        
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: response["message"]});
      }
    },
    (error)=>{
      this.message.add({severity:'error', summary: 'Error', detail: error});
    }
    );
  }

  addQuantity(id:any){
    let cart=this.cartItems;
    console.log(id);
    // find the index of the cart item with the id
    let index = cart.findIndex((item:any)=>item["deal_id"]==id);
    // if index is not found then return
    if(index==-1){
      return;
    }
    cart[index].quantity+=1;
    localStorage.setItem('cart',JSON.stringify(cart));
    this.getDeals();
  }

  removeQuantity(id:any){
    let cart=this.cartItems;
    console.log(id);
    // find the index of the cart item with the id
    let index = cart.findIndex((item:any)=>item["deal_id"]==id);
    // if index is not found then return
    if(index==-1){
      return;
    }
    cart[index].quantity-=1;
    if(cart[index].quantity==0){
      cart.splice(index,1);
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    this.getDeals();
  }

  getCart(){
    let cart=localStorage.getItem('cart');
    if(cart!=undefined && cart!=null && cart!=''){
      this.cartItems=JSON.parse(cart);
      console.log(this.cartItems);
      
    }
  }
  validateCart(){
    this.http.post(this.serverUrl+'validate-cart',{
      token:localStorage.getItem('token'),
      cart:this.cartItems

    }).subscribe((res:any)=>{
      if(res.success){
        this.message.add({severity:'success', summary:'Success', detail:res.message});
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
    },(err:any)=>{
      this.message.add({severity:'error', summary:'Error', detail:err.message});
    }
    );
  }

}
