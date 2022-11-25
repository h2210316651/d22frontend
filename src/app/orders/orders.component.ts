import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// import env.prod
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public orders:any[]= [];
  public currentPage:number=1;
  public totalOrders:number=0;
  public showSidebar=false;
  constructor(
    private http:HttpClient,
    private message:MessageService

  ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('vendorToken');
    window.location.reload();
  }

  nextPage(){
    if (this.currentPage < this.totalOrders/10) {
      this.currentPage++;
      this.getOrders();
    }else{
      this.message.add({severity:'warn',summary:'No more Data',detail:'No more pages'});
    }
  }
  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getOrders();
    }else{
      this.message.add({severity:'warn',summary:'No more Data',detail:'This is the first page'});
    }
  }

  getOrders(){
    this.http.get(this.serverUrl + 'orders/?token='+localStorage.getItem('token')+"&page="+this.currentPage+"&limit=10").subscribe((res:any)=>{
      if(res["success"]){
        console.log(res);
        this.message.add({severity:'info',summary:'done',detail:res.message});
        this.orders= res["orders"];
        this.totalOrders= res["total"];
        
      }else{
        this.message.add({severity:'error',summary:'error',detail:res.message});
      }
    },(err)=>{
      console.log(err);
      this.message.add({severity:'error',summary:'error',detail:'network error'});
    })
  }
}
