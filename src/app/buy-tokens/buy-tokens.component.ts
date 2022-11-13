import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from '../../environments/environment.prod';
declare var Razorpay: any;

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.scss']
})
export class BuyTokensComponent implements OnInit {
  public exchangeRate =0;
  public buyAmount=0;
  public walletBalance=0;
  public serverUrl = environment.serverUrl;
  public tokenMarketplace = false;

  constructor(
    private http:HttpClient,
    private message:MessageService
  ) { }

  ngOnInit(): void {
    this.getTokens();
  }

  placeOrder(){
    if (this.buyAmount<1){
      this.message.add({severity:'error', summary: 'Error', detail: 'Minimum buy amount is 1'});
      return;
    }
    this.http.post(this.serverUrl+'dealz22-tokens/',{
      token:localStorage.getItem("token"),
      number_of_tokens:this.buyAmount
    }).subscribe((res:any)=>{
      if(res.success){
        this.message.add({severity:'success', summary: 'Success', detail: res.message});
        console.log(res);
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
        "order_id": res.data.order.id,
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
          alert(response.error.metadata.payment_id);});
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: res.message});
      }
    },(err)=>{
      this.message.add({severity:'error', summary: 'Error', detail: 'Something went wrong'});
    });
  }

  handler(response:any){
    console.log("handler ran");
    
    // verify the transaction
    this.http.post(this.serverUrl+'verify-transaction-tokens',{
      "razorpay_payment_id":response.razorpay_payment_id,
      "razorpay_order_id":response.razorpay_order_id,
      "razorpay_signature":response.razorpay_signature,
   
    }).subscribe((res:any)=>{
      if(res.success){
        window.alert("Payment Successful");
        // clear the cart
       

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
  getTokens(){
    this.http.get(this.serverUrl+'dealz22-tokens/?token='+localStorage.getItem("token")).subscribe((res:any)=>{
      if(res.success){
        this.walletBalance = res.data.dealz22tokens;
        this.tokenMarketplace = res.data.tokenMarketplace;
        this.exchangeRate = res.data.exchangeRate;
        console.log(res);
        
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: res.message});
      }
    })
  }
}
