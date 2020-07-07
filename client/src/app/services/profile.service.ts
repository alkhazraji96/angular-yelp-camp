import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const profileURL = 'http://192.168.10.55:3000/users/'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(userSlug) {
    return this.httpClient.get<any>(profileURL + userSlug).toPromise()
  }
}
