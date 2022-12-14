import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from 'src/environments/environment.prod';
interface Dealtype {
  name: string;
  code: any;
}
@Component({
  selector: 'app-admin-deals',
  templateUrl: './admin-deals.component.html',
  styleUrls: ['./admin-deals.component.scss']
})
// interface for p-dropdown

export class AdminDealsComponent implements OnInit {
  public minimumDate = new Date();
  public display = false;
  public serverUrl = environment.serverUrl;
  public selectedDeal:any={};
  public isSelected:boolean=true;
  public deals:any[]=[];
  public totalResults:number=0;
  public pages:number=0;
  public currentPage:number=1;
  public selectedDealType:any ={name:"All",code: "all"};
  public dealTypes: Dealtype[] = [
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
    this.getDeals("all",1,-1);
  }
  modifyDeal(){
    // console.log(this.selectedDeal);
    console.log(
      "deal_id: "+this.selectedDeal.deal_id+
      {
        "close_date":this.selectedDeal.mod_close_date.toISOString(),
        "product_name":this.selectedDeal.product_name,
        "product_description":this.selectedDeal.product_description,
        "prize_name":this.selectedDeal.prize_name,
        "prize_description":this.selectedDeal.prize_description,
        "units_allocated":this.selectedDeal.units_allocated,
        "buy_price":this.selectedDeal.buy_price,

      }.toString()
    );
    
    this.http.post(this.serverUrl + 'update-deal',{
      token:localStorage.getItem('adminToken'),
      deal_id:this.selectedDeal._id,
      items:{
        "close_date":this.selectedDeal.mod_close_date.toISOString(),
        "product_name":this.selectedDeal.product_name,
        "product_description":this.selectedDeal.product_description,
        "prize_name":this.selectedDeal.prize_name,
        "prize_description":this.selectedDeal.prize_description,
        "units_allocated":this.selectedDeal.units_allocated,
        "buy_price":this.selectedDeal.buy_price,

      }
    }).subscribe((res:any)=>{
      if(res.success==true){
        this.message.add({severity:'success', summary: 'Success', detail: res.message});
      }
    },(err)=>{
      console.log(err);
      this.message.add({severity:'error', summary: 'Error', detail: err.message});
    });
    
  }
  logger(){
    // console.log(this.selectedDealType.code);
    // console.log(this.selectedLimit.code);
    console.log(this.selectedDeal.mod_close_date);
    
    
  }
  openPopup(deal:any){
    this.selectedDeal=deal;
    this.selectedDeal.mod_close_date=null;
    this.isSelected=true;
    
    this.display=true;
    console.log(deal);
    
  }
  prevPage(){
    if(this.currentPage>1){
      this.currentPage--;
      this.getDeals(this.selectedDealType.code,this.currentPage,this.selectedLimit.code);
    }else{
      this.message.add({severity:'info', summary: 'Info', detail: "This is first page"});
    }
  }
  nextPage(){
    // check if cuent page is last page
    if(this.currentPage<this.pages){
      this.currentPage++;
      this.getDeals(this.selectedDealType.code,this.currentPage,this.selectedLimit.code);
    }else{
      this.message.add({severity:'info', summary: 'Info', detail: "This is last page"});
    }
  }
  getDeals(type:any,page:any,limit:any){
    this.http.get(this.serverUrl + 'deals/?token='+localStorage.getItem('adminToken')+"&typeR="+type+"&page="+page+"&limit="+limit).subscribe((res:any)=>{
      console.log(res);
      if(res["success"]){
        this.message.add({severity:'success', summary: 'Success', detail: res["message"]});
        this.deals=res["data"]["deals"]
        this.pages=res["data"]["pages"]
        this.totalResults=res["data"]["total_results"]
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
