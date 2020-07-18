import { Component, OnInit, Input } from '@angular/core';

import { CampgroundsService } from 'src/app/services/campgrounds.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  camps: Object
  @Input() cgFilter: Object = ''
  constructor(private campgroundService: CampgroundsService) { }

  async ngOnInit() {
    const response = await this.campgroundService.getCampgrounds()
    this.camps = response.campgrounds
  }
}