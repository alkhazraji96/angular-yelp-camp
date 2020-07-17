import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './campgrounds.component.html',
  styleUrls: ['./campgrounds.component.css']
})
export class CampgroundsComponent implements OnInit {
  cgFilter:any = ''
  constructor() { }

  ngOnInit(): void {
  }
  onKeyup(event) {
    this.cgFilter = event    
  }
}
