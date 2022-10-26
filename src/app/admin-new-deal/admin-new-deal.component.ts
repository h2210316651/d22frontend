import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-admin-new-deal',
  templateUrl: './admin-new-deal.component.html',
  styleUrls: ['./admin-new-deal.component.scss']
})
export class AdminNewDealComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public products:any = [];
  public minimumDate = new Date();
  public deal:any={
    startDate:undefined,
    closeDate:undefined,
    quantity:undefined,
    prizeName:undefined,
    prizeDescription:undefined,
    prizeImgb64:undefined,
    promoImgb64:undefined,
    unitPrice:undefined,
    opex:undefined,
    tokencap:undefined,
    tokenValue:undefined,
    product_id:undefined,
    prize_value:undefined,
    profit:undefined,
  }
  public selectedProduct:any = {
    "name": '',
    "price": '',
    "description": '',
    "image": '',
    "gtin":'',
    "mrp":'',
    "quantity":'',
    "vendor_id":'',
    "vendor_name":'',
    "_id":''

  };  
  constructor(
    private http:HttpClient,
    private message:MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  logger(item:any){
    console.log(item);
    
  }
  setb64(event:any,item:any){
    // convert image to 
    // console.log(this.newProduct.image);
    
    var reader = new FileReader();
    var file =event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(item=='deal.prizeImgb64'){
        this.deal.prizeImgb64=reader.result as string;
      // console.log(this.deal.prizeImgb64);
      }

      if(item=='deal.promoImgb64'){
        this.deal.promoImgb64=reader.result as string;
      // console.log(this.deal.promoImgb64);
      }
      
      
    }
  }
  productChange(){
    // this.selectedProduct = product;
    // set remaining parameters using this.selectedProduct['_id]
    // find product from products array using this.selectedProduct['_id]
    // set remaining parameters using product
    let product = this.products.find((product:any)=>product._id == this.selectedProduct['_id']);
    this.selectedProduct['name'] = product.name;
    this.selectedProduct['price'] = product.price;
    this.selectedProduct['description'] = product.description;
    this.selectedProduct['image'] = product.image;
    this.selectedProduct['gtin'] = product.gtin;
    this.selectedProduct['mrp'] = product.mrp;
    this.selectedProduct['quantity'] = product.quantity;
    this.selectedProduct['vendor_id'] = product.vendor_id;
    this.selectedProduct['vendor_name'] = product.vendor_name;
    console.log(this.selectedProduct);

  }
  getProducts(){
    this.http.get(this.serverUrl + 'products/?token='+localStorage.getItem("adminToken")).subscribe((res:any)=>{
      console.log(res);
      if(res.success){
        this.products = res.products;
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
    },
    (err)=>{
      this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
    }
    
    );
  }
  createDeal(){
    console.log(
      {
        "open_date": this.deal.startDate.toISOString(),
    "close_date": this.deal.closeDate.toISOString(),
    "buy_price": this.deal.unitPrice,
    "product_name": this.selectedProduct['name'],
    "product_description": this.selectedProduct['description'],
    "product_id": this.selectedProduct['_id'],
    "vendor_id": this.selectedProduct['vendor_id'],
    "units_allocated": this.deal.quantity,
    "prize_name": this.deal.prizeName,
    "prize_description": this.deal.prizeDescription,
    "product_image": this.selectedProduct['image'],
    "prize_image": this.deal.prizeImgb64,
    "promo_image": this.deal.promoImgb64,
    "deals22token_cap": this.deal.tokencap,
    "deals22token_value": this.deal.tokenValue,
    "token": localStorage.getItem("adminToken")
  
  
      }
    );
    
    this.http.post(this.serverUrl + 'deal', {
      "open_date": this.deal.startDate.toISOString(),
  "close_date": this.deal.closeDate.toISOString(),
  "buy_price": this.deal.unitPrice,
  "product_name": this.selectedProduct['name'],
  "product_description": this.selectedProduct['description'],
  "product_id": this.selectedProduct['_id'],
  "vendor_id": this.selectedProduct['vendor_id'],
  "units_allocated": this.deal.quantity,
  "prize_name": this.deal.prizeName,
  "prize_description": this.deal.prizeDescription,
  "product_image": this.selectedProduct['image'],
  "prize_image": this.deal.prizeImgb64,
  "promo_image": this.deal.promoImgb64,
  "deals22token_cap": this.deal.tokencap,
  "deals22token_value": this.deal.tokenValue,
  "token": localStorage.getItem("adminToken")


    }).subscribe((res:any)=>{
      console.log(res);
      if(res.success){

        
        this.message.add({severity:'success', summary:'Success', detail:res.message});
      // reset deal and selected product
      this.deal={
        startDate:undefined,
        closeDate:undefined,
        quantity:undefined,
        prizeName:undefined,
        prizeDescription:undefined,
        prizeImgb64:undefined,
        promoImgb64:undefined,
        unitPrice:undefined,
        opex:undefined,
        tokencap:undefined,
        tokenValue:undefined, 
        product_id:undefined,
        prize_value:undefined,
        profit:undefined,
      };
      this.selectedProduct = {
        "name": '',
        "price": '',
        "description": '',
        "image": '',
        "gtin":'',
        "mrp":'',
        "quantity":'',

        "vendor_id":'',
        "vendor_name":'',
        "_id":''
      };
      // delay 1 sec
      setTimeout(() => {
      window.location.reload();
      }, 1000);
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
    },
    (err)=>{
      this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
    }
    
    );
  }
  calculateProfit(){
    this.deal.profit=0;
    this.deal.profit=this.formatCurrency((this.deal.quantity*(this.deal.unitPrice-this.selectedProduct["price"]))-(this.deal.opex+this.deal.prize_value));
  }

  formatCurrency(value:any){
    return value.toLocaleString('en-IN', {style: 'currency', currency: 'INR'});
  }

}
