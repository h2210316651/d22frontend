import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import encironemnt variables
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public basicData:any;
  public serverUrl=environment.serverUrl;
  public basicOptions:any;
  public usersData:any;
  constructor(
    private http:HttpClient
  ) {
    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };
   }

  ngOnInit(): void {
    this.getUserStats();
  }

  getUserStats(){
    this.http.get(this.serverUrl+"stats/?token="+localStorage.getItem('adminToken')).subscribe((res:any)=>{
     if(res.success){
       let labels=[
        "Last 24 Hours",
        "Last 7 Days",
        "Last 30 Days",
        "Last 365 Days",
        "All Time"
       ];
       let datasets=[
        {
          label: 'User Signups',
          data: [res.users_last_24_hours,res.users_this_week,res.users_this_month,res.users_this_year,res.users_all_time],
          fill: true,
          // translucent red color
          backgroundColor: 'rgba(255,167,38,0.2)',
          borderColor: '#FFA726',
          tension: 0.4
        }
       ];
       
       this.usersData=res;
       this.usersData.success=null;
        this.usersData.message=null;
        console.log(this.usersData);
        
       this.basicData={
        labels: labels,
        datasets: datasets
       }
     }
    },
    
    (err:any)=>{
      console.log(err);
    }

    )
  }
}
