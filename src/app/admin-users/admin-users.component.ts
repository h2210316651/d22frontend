import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
// get environment.prod
import { environment } from '../../environments/environment.prod';

interface Role {
  name: string,
  code: string
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
  
})

export class AdminUsersComponent implements OnInit {
  public serverUrl = environment.serverUrl;
  public users: any[] = [];
  public roles:Role[]=[{"name":"Admin","code":"admin"},{"name":"Vendor","code":"vendor"},{"name":"Customer","code":"user"}];
  public activeEditUser:any;
  public newUser:any={
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "phone": "",
    "role": "user",
    "token": ""
  };
  public createuser:boolean=false;
  constructor(

    private http: HttpClient,
    private message:MessageService

  ) { 
    this.getUsers();
  }

  ngOnInit(): void {
  }
  applyFilterGlobal(dt:Table,$event:any, stringVal:any) {
    dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
}
enableCreateUser(){
  this.createuser=true;

}


createUser(){
  // {
  //   "first_name": "string",
  //   "last_name": "string",
  //   "email": "string",
  //   "password": "string",
  //   "phone": "string",
  //   "otp": "string",
  //   "email_verified": false,
  //   "created_at": "2022-10-12T07:20:32.223Z",
  //   "updated_at": "2022-10-12T07:20:32.223Z",
  //   "otp_verified": false,
  //   "role": "user",
  //   "token": "string"
  // }

  this.http.post(this.serverUrl + 'user',{
    "token":localStorage.getItem('adminToken'),
    "first_name":this.newUser.first_name,
    "last_name":this.newUser.last_name,
    "email":this.newUser.email,
    "password":this.newUser.password,
    "phone":this.newUser.phone,
    "role":this.newUser.role

  }).subscribe((res:any) => {
    console.log(res);
    if(res.success){
      this.message.add({severity:'success', summary:'Success', detail:res.message});
      this.newUser={
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "phone": "",
        "role": "user",
        "token": "string"
      };
     this.createuser=false;
      this.getUsers();
    }else{
      this.message.add({severity:'error', summary:'Error', detail:res.message});
    }
    

  },(err) => {
    this.message.add({severity:'error', summary:'Error', detail:'Something went wrong'});
  }
  
  
  );
}

  getUsers() {
    this.http.get(this.serverUrl + 'users?token='+localStorage.getItem('adminToken')).subscribe((res:any) => {
      console.log(res);
      if(res.success){
        res.users.forEach((user:any) => {
        user.editVisible=false;
        // convert user.address to string using keys and values
        if(user.address!=null && user.address!=undefined){
          user.address=Object.keys(user.address).map((key) => {
            return key + ':' + user.address[key];
            
          }).join(', ');
          
        }
      });
        this.users = res.users;
        
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
  editUser(user:any){
    user.editVisible=!user.editVisible;
    this.activeEditUser=user;
  }
  saveUser(user:any){
    this.http.put(this.serverUrl + 'user',{
      "token":localStorage.getItem('adminToken'),
      "first_name":user.first_name,
      "last_name":user.last_name,
      "email":user.email,
      "role":user.role,
      "phone":user.phone,
      "id":user._id

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
   this.http.delete(this.serverUrl + 'user?token='+localStorage.getItem('adminToken')+'&id='+user._id).subscribe((res:any) => {
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
}
