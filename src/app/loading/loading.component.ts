import { Component, OnInit } from '@angular/core';
// import anime js
declare var anime: any;
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    anime({
      targets:".loadingImage",
      // scale:[1,0.55,1,0.55,1],
      rotateY:[0,180,0],
      easing: 'easeInOutSine',
      duration:3000,
      loop:true

    });

    anime({
      targets:".mainLoading",
      // scale:[1,0.55,1,0.55,1],
     
      backgroundColor:['#fff','#f8f9fa',"#fff"],
      // color:['#f22','#fff','#f22'],
      easing: 'linear',
      duration:8000,
      loop:true

    });
  }
}
