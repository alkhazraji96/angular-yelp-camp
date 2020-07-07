import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usr-cg',
  templateUrl: './usr-cg.component.html',
  styleUrls: ['./usr-cg.component.css']
})
export class UsrCgComponent implements OnInit {
  campgrounds:any = ''
  user:any = ''
  constructor(private profileService: ProfileService, private activatedRoutes: ActivatedRoute) { }

  async ngOnInit() {
    const response = (await this.profileService.getProfile(this.activatedRoutes.snapshot.params.slug))
    this.campgrounds = response.campgrounds
    this.user = response.user
  }

}
