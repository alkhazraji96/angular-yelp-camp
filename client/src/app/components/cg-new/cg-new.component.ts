import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { CampgroundsService } from 'src/app/services/campgrounds.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  templateUrl: './cg-new.component.html',
  styleUrls: ['./cg-new.component.css']
})
export class CgNewComponent implements OnInit {
  filename = 'Choose File'
  fileSelcected: File = null

  constructor(
    private campgroundService: CampgroundsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async onAtSubmit(cgNewForm: NgForm) {
    const fb: FormData = new FormData()
    if (this.fileSelcected) {
      fb.append('imageId', this.fileSelcected, this.fileSelcected.name)
    }
    fb.append('title', cgNewForm.value.title)
    fb.append('description', cgNewForm.value.description)
    fb.append('price', cgNewForm.value.price)
    const response = await this.campgroundService.postCampground(fb)
    if (response.campgrounds) {
      this.toastr.success(response.msg, 'Success')
      this.router.navigateByUrl('campgrounds/' + response.campgrounds.slug)
      return
    }
    this.toastr.error(response.msg, 'Error')
  }

  onFileChange(event) {
    this.fileSelcected = event.target.files[0]
    this.filename = this.fileSelcected.name
  }

}
