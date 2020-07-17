import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.css']
})
export class PassResetComponent implements OnInit {
  resetForm = this.fb.group({
    email: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  async onResetSubmit() {
    const response = await this.authService.resetPasswordEmail({ email: this.resetForm.get('email').value })
    if (response.success) { return this.toastr.success(response.msg, 'Success') }
    this.toastr.error(response.msg, 'Error')
  }

}
