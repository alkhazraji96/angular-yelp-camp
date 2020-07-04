import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { campgroundModel } from '../models/campground';

const campgroundURL = 'http://192.168.10.55:3000/campgrounds'

@Injectable({
  providedIn: 'root'
})
export class CampgroundsService {

  constructor(private httpClient: HttpClient) { }

  getCampgrounds() {
    return this.httpClient.get<campgroundModel>(campgroundURL).toPromise()
  }

  postCampground(campground:campgroundModel) {
    return this.httpClient.post<campgroundModel>(campgroundURL, campground).toPromise()
  }

  infoCampgrounds(_id:string) {
    return this.httpClient.get<campgroundModel>(campgroundURL + _id).toPromise()
  }

}
