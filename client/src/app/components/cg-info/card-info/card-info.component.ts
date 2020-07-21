import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {

  camp: any = ''
  author: any = ''
  rating: any = 0
  cgAuth = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private campgroundService: CampgroundsService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    const response = await this.campgroundService.infoCampgrounds(this.activatedRoute.snapshot.params.slug)
    if (!response) { this.toastr.warning('Campground not found'); return this.router.navigateByUrl('campgrounds') }
    this.camp = response.campgrounds[0]
    this.author = response.campgrounds[0].author
    const num: Number = response.campgrounds[0].rating
    this.rating = num.toFixed(2)
    this.cgAuth = this.authenticateUser()
  }

  async onDeleteClick() {
    const response = await this.campgroundService.deleteCampground(this.activatedRoute.snapshot.params.slug)
    if (!response.success) { return this.toastr.error(response.msg, 'Error') }
    this.toastr.success(response.msg, 'Success')
    this.router.navigateByUrl('campgrounds')
  }

  authenticateUser() {
    if (this.authService.getCurrentUser()) {
      const currentUser = this.authService.getCurrentUser()._id
      const cgOwner = this.camp.author._id
      if (currentUser == cgOwner) {
        return true
      }
      return false
    }
    return false
  }
}
