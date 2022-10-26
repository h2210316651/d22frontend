import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';

interface Dealtype {
  name: string;
  code: any;
}
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public selectedOrder:any={};
  public isSelected:boolean=true;
  public orders:any[]=[];
  public totalResults:number=0;
  public pages:number=0;
  public currentPage:number=1;
  public selectedOrderType:any ={name:"All",code: "all"};
  public orderTypes: Dealtype[] = [
    { name: 'All', code: 'all' },
    { name: 'Open', code: 'open' }
    
  ];
  public selectedLimit:any = {name:"100",code:100};
  public dealsperpage:Dealtype[] = [
    { name: '10', code: 10 },
    { name: '20', code: 20 },
    { name: '50', code: 50 },
    { name: '100', code: 100 },
    { name: '500', code: 500 }
  ];
  constructor(
    private http: HttpClient,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.getOrders("all",1,100);
  }

  saveItem(order:any){
    this.http.put(this.serverUrl+"item",{
      "order_id":order.order_id,
      "item_id":order.item_id,
      "status":order.status,
      "track_url":order.track_url,
      "token":localStorage.getItem('adminToken')
    }).subscribe((res:any)=>{
      console.log(res);
      if(res["success"]){
        this.message.add({severity:'success', summary: 'Success', detail: res["message"]});
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: res["message"]});
      }
    },
    (err:any)=>{
      console.log(err);
      this.message.add({severity:'error', summary: 'Error', detail: err["message"]});
    }
    );

  }
  prevPage(){
    if(this.currentPage>1){
      this.currentPage--;
      this.getOrders(this.selectedOrderType.code,this.currentPage,this.selectedLimit.code);
    }else{
      this.message.add({severity:'info', summary: 'Info', detail: "This is first page"});
    }
  }
  nextPage(){
    // check if cuent page is last page
    if(this.currentPage<this.pages){
      this.currentPage++;
      this.getOrders(this.selectedOrderType.code,this.currentPage,this.selectedLimit.code);
    }else{
      this.message.add({severity:'info', summary: 'Info', detail: "This is last page"});
    }
  }
  getOrders(type:any,page:any,limit:any){
    this.http.get(this.serverUrl + 'orders/?token='+localStorage.getItem('adminToken')+"&typeR="+type+"&page="+page+"&limit="+limit).subscribe((res:any)=>{
      console.log(res);
      if(res["success"]){
        this.orders=res["orders"]
        this.pages=res["total_pages"]
        this.totalResults=res["total_orders"]
        console.log(this.totalResults);
        this.message.add({severity:'success', summary: 'Success', detail: res["message"]});
        
        // this.currentPage=1;
      }else{
        this.message.add({severity:'error', summary: 'Error', detail: res["message"]});
      }
    },(err)=>{
      console.log(err);
      this.message.add({severity:'error', summary: 'Error', detail: err["message"]});
    })
  }
}
