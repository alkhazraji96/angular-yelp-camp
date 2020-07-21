import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usr-details',
  templateUrl: './usr-details.component.html',
  styleUrls: ['./usr-details.component.css']
})
export class UsrDetailsComponent implements OnInit {
  user: any = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  async ngOnInit() {
    const response = await this.profileService.getProfile(this.activatedRoute.snapshot.params.slug)
    if (!response) { this.toastr.warning('Profile not found'); return this.router.navigateByUrl('campgrounds') }
    this.user = response.user
  }
}
