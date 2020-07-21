import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const reviewURL = '/api/campgrounds/'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  postReview(campgroundSlug:string, newReview:any) {
    return this.httpClient.post<any>(reviewURL + campgroundSlug + '/review', newReview).toPromise()
  }

  infoReview(campgroundSlug:string, review_id:string) {
    return this.httpClient.get<any>(reviewURL + campgroundSlug + '/review/' + review_id + '/edit').toPromise()
  }

  editReview(campgroundSlug:string, review_id, newReview:any) {
    return this.httpClient.put<any>(reviewURL + campgroundSlug + '/review/' + review_id, newReview).toPromise()
  }

  deleteReview(campgroundSlug:string, review_id:string) {
    return this.httpClient.delete<any>(reviewURL + campgroundSlug + '/review/' + review_id).toPromise()
  }
}
