import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const campgroundURL = '/api/campgrounds'

@Injectable({
  providedIn: 'root'
})
export class CampgroundsService {
  cgFilter:any = { title: '' }
  constructor(private httpClient: HttpClient) { }

  getCampgrounds() {
    return this.httpClient.get<any>(campgroundURL).toPromise()
  }

  postCampground(campground) {
    return this.httpClient.post<any>(campgroundURL, campground).toPromise()
  }

  infoCampgrounds(slug: string) {
    return this.httpClient.get<any>(campgroundURL + slug).toPromise()
  }

  editCampground(campground, slug: string) {
    return this.httpClient.put<any>(campgroundURL + slug, campground).toPromise()
  }

  deleteCampground(slug: string) {
    return this.httpClient.delete<any>(campgroundURL + slug).toPromise()
  }

}
