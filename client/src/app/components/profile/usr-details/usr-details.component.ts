import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-usr-details',
  templateUrl: './usr-details.component.html',
  styleUrls: ['./usr-details.component.css']
})
export class UsrDetailsComponent implements OnInit {
  user:any = ''

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService) { }

  async ngOnInit() {
    this.user = (await this.profileService.getProfile(this.activatedRoute.snapshot.params.slug)).user
  }  

}
