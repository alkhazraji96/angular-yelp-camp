import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

const registerURL = 'register'
const loginURL = 'login'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private sessionStorageService: SessionStorageService, private router: Router) { }
  registerUser(user) {
    return this.httpClient.post<any>(registerURL, user).toPromise()
  }

  loginUser(user) {
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

  resetPasswordEmail(email: Object) {
    return this.httpClient.post<any>('reset-password', email).toPromise()
  }

  verifyTokenPassword(token: string) {
    return this.httpClient.get<any>('reset-password/' + token).toPromise()
  }

  newPassword(password: Object, token: string) {
    return this.httpClient.post<any>('reset-password/' + token, password).toPromise()
  }

  onLogout() {
    this.sessionStorageService.clear('id_token')
    this.router.navigateByUrl('campgrounds')
  }
}
