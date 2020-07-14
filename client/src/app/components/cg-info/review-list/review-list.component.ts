import { Component, OnInit, Input } from '@angular/core';
import { CampgroundsService } from '../../../services/campgrounds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews:any = ''
  constructor(
    private campgroundsService: CampgroundsService,
    private reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
    ) { }

  async ngOnInit() {
    const response = await this.campgroundsService.infoCampgrounds(this.activatedRoute.snapshot.params.slug)
    this.reviews = response.campgrounds[0].reviews
  }
  async onDeleteClick(rev_id) {
    const response = await this.reviewService.deleteReview(this.activatedRoute.snapshot.params.slug, rev_id)
    if (!response.success) { return this.toastr.error('Failed to delete the Review', 'Error') }
    this.toastr.success('Review Deleted Successfully', 'Success')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/campgrounds/' + this.activatedRoute.snapshot.params.slug]);
  }
  
}
