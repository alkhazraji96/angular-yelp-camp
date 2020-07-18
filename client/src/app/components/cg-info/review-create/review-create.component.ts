import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/services/review.service';
import { AuthService } from 'src/app/services/auth.service';
import { CampgroundsService } from 'src/app/services/campgrounds.service';


@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {

  rating: Number = 0
  text = 'Write A review...'
  cgAuthor: any = ''
  currentUser: any = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private campground: CampgroundsService
  ) { }

  async ngOnInit() {
    const response = await this.campground.infoCampgrounds(this.activatedRoute.snapshot.params.slug)
    this.cgAuthor = response.campgrounds[0].author._id
    if (this.auth.getCurrentUser()) {
      this.currentUser = this.auth.getCurrentUser()
    }
  }

  async onSubmitClick() {
    if (this.currentUser) {
      if (!this.rating) { return this.toastr.warning('Please provide a rating') }
      const newReview = {
        rating: this.rating,
        text: this.text
      }
      const response = await this.reviewService.postReview(this.activatedRoute.snapshot.params.slug, newReview)
      if (!response.success) { return this.toastr.error(response.msg, 'Error') }
      this.toastr.success(response.msg, 'Success')
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/campgrounds/' + this.activatedRoute.snapshot.params.slug]);
      return
    }
    this.toastr.warning('login first to add a review')
  }

  onRatingSet(event) {
    this.rating = event
  }

}
