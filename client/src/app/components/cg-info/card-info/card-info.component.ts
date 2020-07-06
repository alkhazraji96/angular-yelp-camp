import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { campgroundModel } from 'src/app/models/campground';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {

  camp:any = ''
  author:any = ''

  constructor(private route: ActivatedRoute, private campgroundService: CampgroundsService) { }

  async ngOnInit() {
    const response = await this.campgroundService.infoCampgrounds(this.route.snapshot.params.id)
    this.camp = response.campgrounds[0]
    this.author = response.campgrounds[0].author
  }


}
