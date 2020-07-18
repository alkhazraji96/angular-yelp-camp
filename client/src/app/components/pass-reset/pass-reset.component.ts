import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.css']
})
export class PassResetComponent implements OnInit {
  resetForm = this.fb.group({
    email: ['', Validators.required]
  })
  loading:boolean = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  async onResetSubmit() {
    this.loading = true
    const response = await this.authService.resetPasswordEmail({ email: this.resetForm.get('email').value })
    this.loading = false
    if (response.success) { return this.toastr.success(response.msg, 'Success') }
    this.toastr.error(response.msg, 'Error')
  }

}
