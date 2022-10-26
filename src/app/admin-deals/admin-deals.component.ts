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
  logger(){
    console.log(this.selectedDealType.code);
    console.log(this.selectedLimit.code);
    
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
