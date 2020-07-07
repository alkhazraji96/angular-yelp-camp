import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:any = ''
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      this.user = this.authService.getCurrentUser()
  }
  onLogout() {
    this.authService.onLogout()
    this.user = ''
  }
}
