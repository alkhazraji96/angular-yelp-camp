import { Component, OnInit, OnChanges } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent implements OnInit {
  text: any = 'Edit Review ....'
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
    const updatedReview = { text: this.text, rating: this.rating }
    const response = await this.reviewService.editReview(this.activatedRoute.snapshot.params.slug, this.activatedRoute.snapshot.params.review_id, updatedReview)
    if (!response.success) { return this.toastr.error('Failed to update the Review', 'Error') }
    this.toastr.success('Review Updated Successfully', 'Success')
    this.router.navigateByUrl(`campgrounds/${this.activatedRoute.snapshot.params.slug}`)
  }

}
