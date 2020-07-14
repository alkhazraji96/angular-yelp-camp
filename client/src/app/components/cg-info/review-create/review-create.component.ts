import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../services/review.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})
export class ReviewCreateComponent implements OnInit {

  rating: Number = 0
  text = 'Write A review...'

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmitClick() {
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
  }

  onRatingSet(event) {
    this.rating = event
  }

}
