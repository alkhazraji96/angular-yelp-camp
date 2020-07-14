import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

const URL = 'http://192.168.10.55:3000/'
const registerURL = URL + 'register'
const loginURL = URL + 'login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService, private router: Router) { }
  registerUser(user) {
    return this.httpClient.post<any>(registerURL, user).toPromise()
  }

  loginUser(user: UserModel) {
    return this.httpClient.post<any>(loginURL, user).toPromise()
  }

  getAsyncToken() {
    return this.sessionStorageService.retrieve('id_token')
  }

  getCurrentUser() {
    if (this.sessionStorageService.retrieve('id_token')) {
      const jwtHelperService = new JwtHelperService()
      return jwtHelperService.decodeToken(this.sessionStorageService.retrieve('id_token')).user
    }
    return null
  }

  onLogout() {
    this.sessionStorageService.clear('id_token')
    this.router.navigateByUrl('campgrounds')
  }
}
