import { Component, OnInit } from '@angular/core';

import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { campgroundModel } from 'src/app/models/campground';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  camps:any
  constructor(private campgroundService: CampgroundsService) { }

  async ngOnInit() {
    // ngFor can't access array inside object it should be just an array
    const response = await this.campgroundService.getCampgrounds()
    let campgrounds: campgroundModel = new campgroundModel()
    campgrounds.campgrounds = response.campgrounds
    this.camps = campgrounds.campgrounds
  }
}