import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  loginForm:any

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async onLoginSubmit() {
    const response = await this.authService.loginUser(this.loginForm.value)
    if (!response.id_token) { return this.toastr.error(response.msg, 'Enter Correct Credentials') }
    this.sessionStorageService.store('id_token', response.id_token)
    this.toastr.success(response.msg, 'Welcome Back!')
    this.router.navigateByUrl('campgrounds')
  }

}
