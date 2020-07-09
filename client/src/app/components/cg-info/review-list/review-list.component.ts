import { Component, OnInit, Input } from '@angular/core';
import { CampgroundsService } from '../../../services/campgrounds.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews:any = ''
  constructor(private campgroundsService: CampgroundsService) { }

  async ngOnInit() {

    const response = await this.campgroundsService.getCampgrounds()
    this.reviews = response.campgrounds[0].reviews
  }
  
}
