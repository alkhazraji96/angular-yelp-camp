import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const URL = 'http://192.168.10.55:3000/'
const registerURL = URL + 'register'
const loginURL = URL + 'login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) { }
  registerUser(user) {
    return this.httpClient.post<any>(registerURL, user).toPromise()
  }

  loginUser(user: UserModel) {
    return this.httpClient.post<any>(loginURL, user).toPromise()
  }

  getAsyncToken() {
      const token = this.cookieService.get('id_token')
      return token
  }

  getCurrentUser() {
    if (this.cookieService.check('id_token')) {
      const jwtHelperService = new JwtHelperService()
      return jwtHelperService.decodeToken(this.cookieService.get('id_token')).user
    }
    return null
  }

  onLogout() {
    this.cookieService.deleteAll()
    this.router.navigateByUrl('campgrounds')
  }
}
