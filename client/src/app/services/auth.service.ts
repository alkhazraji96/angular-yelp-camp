import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

const URL = 'http://192.168.10.55:3000/'
const registerURL = URL + 'register'
const loginURL = URL + 'login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }
  registerUser(user) {
    return this.httpClient.post<any>(registerURL, user).toPromise()
  }
  
  loginUser(user:UserModel) {
    return this.httpClient.post<UserModel>(loginURL, user).toPromise()
  }

  getAsyncToken() {
    return this.cookieService.get('id_token')
  }
  
}
