import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  resetForm = this.fb.group({
    password: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  async onResetSubmit() {
    const response = await this.authService.newPassword({ password: this.resetForm.get('password').value }, this.activatedRoute.snapshot.params.token)
    if (response.success) {
      this.toastr.success(response.msg, 'Success')
      return this.router.navigateByUrl('login')
    }
    this.toastr.error(response.msg, 'Error')
  }
}
