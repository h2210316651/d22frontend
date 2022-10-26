import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { environment } from '../../environments/environment.prod';
interface Role {
  name: string,
  code: string
}
interface Vendor{
  name:string,
  id:string
}
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public products: any[] = [];
  public roles:Role[]=[{"name":"Admin","code":"admin"},{"name":"Vendor","code":"vendor"},{"name":"Customer","code":"customer"}];
  public vendorsList:Vendor[]=[];
  public createproduct:boolean=false;
  public newProduct:any={
    "name": "",
  "description": "",
  "price": 0,
  "mrp": 0,
  "quantity": 0,
  "image": "",
  "imageBase64":"",
  "gtin": "",
  "vendor_id": "",
  };
  public activeEditUser:any;
  constructor(
    private http: HttpClient,
    private message:MessageService

  ) { 
    this.getUsers();
    this.getVendors();
  }

  ngOnInit(): void {
  }
  applyFilterGlobal(dt:Table,$event:any, stringVal:any) {
    dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
}

setb64(event:any){
  // convert image to 
  console.log(this.newProduct.image);
  
  var reader = new FileReader();
  var file =event.target.files[0];
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.newProduct.imageBase64 = reader.result as string;
    console.log(this.newProduct.imageBase64);
    
  }
}
enableCreateProduct(){
  this.createproduct=true;
}

getVendors(){
  this.http.get(this.serverUrl + 'vendors?token='+localStorage.getItem('adminToken')).subscribe((res:any) => {
    console.log(res);
    if(res.success){
      this.vendorsList=res.vendors;
      // add res.vendors to this.vendorsList 100 times
      // for (let i = 0; i < 100; i++) {
      //   this.vendorsList = this.vendorsList.concat(res.vendors);
      // }
      console.log(this.vendorsList);
      
    }else{
      this.message.add({severity:'error', summary:'Error', detail:res.message});
    }
  }, (err) => {
    this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
  });
}

  getUsers() {
    this.http.get(this.serverUrl + 'products?token='+localStorage.getItem('adminToken')).subscribe((res:any) => {
      console.log(res);
      if(res.success){
        res.products.forEach((product:any) => {
        product.editVisible=false;
        });
        this.products = res.products;
        // append res.users to this.users 100 times
        // for (let i = 0; i < 100; i++) {
        //   this.users = this.users.concat(res.users);
        // }
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
    }, (err) => {
      this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
    }
    
    );
  }
  editUser(product:any){
    product.editVisible=!product.editVisible;
    this.activeEditUser=product;
  }
  saveUser(product:any){
    this.http.put(this.serverUrl + 'product',{
      "token":localStorage.getItem('adminToken'),
      // id, name, description,quantity,price,mrp,gtin,token
      "id":product._id,
      "name":product.name,
      "description":product.description,
      "quantity":product.quantity,
      "price":product.price,
      "mrp":product.mrp,
      "gtin":product.gtin,


    }).subscribe((res:any) => {
      console.log(res);
      if(res.success){
        this.message.add({severity:'success', summary:'Success', detail:res.message});
        this.activeEditUser.editVisible=false;
        this.activeEditUser=undefined;
        this.getUsers();
      }
      
  }, (err) => {
    this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
  }
  
  );
}

  deleteUser(user:any){
   this.http.delete(this.serverUrl + 'product?token='+localStorage.getItem('adminToken')+'&id='+user._id).subscribe((res:any) => {
    console.log(res);
    if(res.success){
      this.message.add({severity:'success', summary:'Success', detail:res.message});
      this.getUsers();
    }else{
      this.message.add({severity:'error', summary:'Error', detail:res.message});
    }
    

  }, (err) => {
    this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
  }
  
  )};


  createProduct(){
    this.http.post(this.serverUrl + 'product',{
      "token":localStorage.getItem('adminToken'),
      "name":this.newProduct.name,
      "description":this.newProduct.description,
      "quantity":this.newProduct.quantity,
      "price":this.newProduct.price,
      "mrp":this.newProduct.mrp,
      "gtin":this.newProduct.gtin,
      "image":this.newProduct.imageBase64,
      "vendor_id":this.newProduct.vendor_id
    }).subscribe((res:any) => {
      console.log(res);
      if(res.success){
        this.message.add({severity:'success', summary:'Success', detail:res.message});
        this.createproduct=false;
        // reset this.newProduct to defaults
        this.newProduct={
          "name": "",
        "description": "",
        "price": 0,
        "mrp": 0,
        "quantity": 0,
        "image": "",
        "imageBase64":"",
        "gtin": "",
        "vendor_id": "",
        };
        this.getUsers();
      }else{
        this.message.add({severity:'error', summary:'Error', detail:res.message});
      }
      
  }, (err) => {
    this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
  }
  
  );
  };

}
