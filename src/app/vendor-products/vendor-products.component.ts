import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// get environment variables
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.scss']
})
export class VendorProductsComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public getProductsUrl= this.serverUrl + 'products/?token=' + localStorage.getItem('vendorToken');
  public products:any=undefined;

  constructor(
    private router:Router,
    private http:HttpClient,
    private messageService: MessageService
  ) {
    this.getProducts();
  
   }

  ngOnInit(): void {
  }
  addProduct(){
    this.router.navigate(['/vendor/new-product']);
  }
  getProducts(){
    this.http.get(this.getProductsUrl).subscribe((res:any)=>{
      console.log(res);
      if(res.success==true){
        res.products.forEach((product:any)=>{
          product.image=this.serverUrl+product.image;
        });
        this.products=res.products;
      }
    },(err:any)=>{
      console.log(err);
    });
  }

  deleteProduct(id:string){
    let deleteProductUrl=this.serverUrl+'product/'+'?token='+localStorage.getItem('vendorToken')+"&id="+id;
    this.http.delete(deleteProductUrl).subscribe((res:any)=>{
      console.log(res);
      if(res.success==true){
        this.getProducts();
        this.messageService.add({severity:'warn', summary: 'Success', detail: 'Product Deleted Successfully'});
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
      }
    }
    
    
    ,(err:any)=>{
      console.log(err);
      this.messageService.add({severity:'error', summary: 'Error', detail: err.message});
    }

    );
  }
  editProduct(id:string){
  }
}
