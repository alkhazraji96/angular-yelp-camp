import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './pass-verify-token.component.html',
  styleUrls: ['./pass-verify-token.component.css']
})
export class PassVerifyTokenComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  async ngOnInit() {
    const response = await this.authService.verifyTokenPassword(this.activatedRoute.snapshot.params.token)
    if (response.success) { return this.router.navigateByUrl('reset-password/' + response.token + '/new-password')}
    this.toastr.error(response.msg, 'Error')
    this.router.navigateByUrl('login')
  }
}
