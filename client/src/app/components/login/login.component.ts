import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async onLoginSubmit(loginForm: NgForm) {
    const response = await this.authService.loginUser(loginForm.value)
    if (!response.id_token) { return this.toastr.error(response.msg, 'Enter Correct Credentials') }
    this.sessionStorageService.store('id_token', response.id_token)
    this.toastr.success(response.msg, 'Welcome Back!')
    this.router.navigateByUrl('campgrounds')
  }

}
