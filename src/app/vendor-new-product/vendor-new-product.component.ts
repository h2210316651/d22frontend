import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import from production environment
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-vendor-new-product',
  templateUrl: './vendor-new-product.component.html',
  styleUrls: ['./vendor-new-product.component.scss']
})
export class VendorNewProductComponent implements OnInit {
  public serverUrl=environment.serverUrl;
  public uploadUrl=this.serverUrl+"product";
  public product:any={
    name:'',
    description:'',
    price:0,
    mrp:0,
    quantity:0,
    gtin:'',
    image:undefined,
    imageBase64:'',

  }
  constructor(
    private http:HttpClient,
    private router:Router,
    private messageService: MessageService

  ) { }

  ngOnInit(): void {
  }
  setb64(event:any){
    // convert image to 
    console.log(this.product.image);
    
    var reader = new FileReader();
    var file =event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.product.imageBase64 = reader.result as string;
      console.log(this.product.imageBase64);
      
    }
  }

  uploadProduct(){
    // post request to upload product
    this.http.post(this.uploadUrl,{
      "name":this.product.name,
      "description":this.product.description,
      "price":this.product.price,
      "mrp":this.product.mrp,
      "quantity":this.product.quantity,
      "gtin":this.product.gtin,
      "image":this.product.imageBase64,
      "token":localStorage.getItem('vendorToken')
  
  }).subscribe((res:any)=>{
    if(res.success==true){
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Product Added Successfully'});
      this.router.navigate(['/vendor/products']);
    }else{
      this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
    }
  });}
}
