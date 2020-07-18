import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const profileURL = 'users/'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(userSlug) {
    return this.httpClient.get<any>(profileURL + userSlug).toPromise()
  }
}
