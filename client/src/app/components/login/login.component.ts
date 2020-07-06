import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  async onLoginSubmit(loginForm: NgForm) {
    const user = await this.authService.loginUser(loginForm.value)
    this.cookieService.set('id_token', user.id_token)    
  }

}
