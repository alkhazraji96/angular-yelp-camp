import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  filename = 'Choose File'
  fileSelcected: File = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  async onRegisterSubmit(regSubmit: NgForm) {
    const fb:FormData = new FormData()
    fb.append('username', regSubmit.value.username)
    fb.append('firstname', regSubmit.value.firstname)
    fb.append('lastname', regSubmit.value.lastname)
    fb.append('email', regSubmit.value.email)
    fb.append('avatarId', this.fileSelcected, this.fileSelcected.name)
    fb.append('password', regSubmit.value.password)
    fb.append('bio', regSubmit.value.bio)
    const response = await this.authService.registerUser(fb)
    console.log(response);
  }

  onFileChange(event) {
    this.fileSelcected = event.target.files[0]
    this.filename = this.fileSelcected.name
  }

}
