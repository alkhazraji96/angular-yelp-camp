import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent implements OnInit {
  text: any = 'Edit Review ....'
  loading:any = false
  rating: any
  constructor(
    private reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    const response = await this.reviewService.infoReview(this.activatedRoute.snapshot.params.slug, this.activatedRoute.snapshot.params.review_id)
    this.text = response.review.text
  }

  onRatingSet(event) {
    this.rating = event
  }
  async onSubmitClick() {
    this.loading = true
    if (!this.rating) { return this.toastr.warning('Please provide a rating') }
    const updatedReview = { text: this.text, rating: this.rating }
    const response = await this.reviewService.editReview(this.activatedRoute.snapshot.params.slug, this.activatedRoute.snapshot.params.review_id, updatedReview)
    this.loading = false
    if (!response.success) { return this.toastr.error('Failed to update the Review', 'Error') }
    this.toastr.success('Review Updated Successfully', 'Success')
    this.router.navigateByUrl(`campgrounds/${this.activatedRoute.snapshot.params.slug}`)
  }

}
