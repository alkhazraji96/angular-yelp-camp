import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  
  async onLoginSubmit(loginForm: NgForm) {
    const response = await this.authService.loginUser(loginForm.value)
    if (!response.id_token) { return this.toastr.error(response.msg, 'Enter Correct Credentials') }
    this.cookieService.set('id_token', response.id_token)
    this.toastr.success(response.msg, 'Welcome Back!')
    this.router.navigateByUrl('campgrounds')
  }
  
}
