import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import enc.prod
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {
  public params = this.activatedRoute.snapshot.params;
  public serverUrl = environment.serverUrl;
  public deal: any = undefined;
  public isLoading=true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router:Router

  ) { }

  ngOnInit(): void {
    // console.log(this.params);
    this.getData();
  }
  
  changeRoute(route:any){
    this.router.navigate([route]);
  }

  getData(){
    let deal_id=this.params["id"];
    let url = this.serverUrl + 'deal/?deal_id=' + deal_id;
    this.http.get(url).subscribe((data: any) => {
      this.deal = data.deal;
      console.log(this.deal);
      
      this.isLoading=false;
    }, (error:any) => {
      this.isLoading=false;
    });
  }



  
}
