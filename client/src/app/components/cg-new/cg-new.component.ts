import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms'
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
  cgForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    imageId: ['', Validators.required],
  })

  constructor(
    private campgroundService: CampgroundsService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    const fb: FormData = new FormData()
    if (this.fileSelcected) {
      fb.append('imageId', this.fileSelcected, this.fileSelcected.name)
    }
    fb.append('title', this.cgForm.get('title').value)
    fb.append('description', this.cgForm.get('description').value)
    fb.append('price', this.cgForm.get('price').value)
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
