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
  loading:boolean = false
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
    this.loading = true
    const response = await this.authService.newPassword({ password: this.resetForm.get('password').value }, this.activatedRoute.snapshot.params.token)
    this.loading = false
    if (response.success) {
      this.toastr.success(response.msg, 'Success')
      return this.router.navigateByUrl('login')
    }
    this.toastr.error(response.msg, 'Error')
  }
}
