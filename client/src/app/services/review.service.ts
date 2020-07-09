import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const reviewURL = 'http://192.168.10.55:3000/campgrounds/'

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  postReview(campgroundSlug:string, newReview:any) {
    return this.httpClient.post<any>(reviewURL + campgroundSlug + '/review', newReview).toPromise()
  }
}
