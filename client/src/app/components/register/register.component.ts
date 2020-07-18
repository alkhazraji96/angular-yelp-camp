import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    avatarId: ['', Validators.required],
    bio: ['Bio']
  })

  filename: string = 'Choose File'
  fileSelcected: File = null
  loading: boolean = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    this.fileSelcected = event.target.files[0]
    this.filename = this.fileSelcected.name
  }

  async onRegisterSubmit() {
    this.loading = true
    const fb: FormData = new FormData()
    fb.append('avatarId', this.fileSelcected, this.fileSelcected.name)
    fb.append('username', this.registerForm.get('username').value)
    fb.append('firstname', this.registerForm.get('firstname').value)
    fb.append('lastname', this.registerForm.get('lastname').value)
    fb.append('email', this.registerForm.get('email').value)
    fb.append('password', this.registerForm.get('password').value)
    fb.append('bio', this.registerForm.get('bio').value)
    const response = await this.authService.registerUser(fb)
    this.loading = false
    if (!response.id_token) { return this.toastr.error(response.msg, 'Register Status') }
    this.sessionStorageService.store('id_token', response.id_token)
    this.toastr.success(response.msg, 'Welcome to YelpCamp!')
    this.router.navigateByUrl('campgrounds')
  }
  async onUsernameChange() {
    if (this.registerForm.get('username').value) {
      const response = await this.authService.registerUser({ checkUsername: this.registerForm.get('username').value })
      if (!response.available) {
        this.registerForm.get('username').setErrors({ usernameIsTaken: true })
      }
    }
  }
}
