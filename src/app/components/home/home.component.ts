import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title : string = 'myAngularGoogleMaps';
  lat : number = 36.75473320561448;
  lng : number = 126.12905910044049;
  zoom : number = 12;
  constructor() { }

  ngOnInit() {
  }

  onChooseLocation(event){
    console.log(event);
  }
}
