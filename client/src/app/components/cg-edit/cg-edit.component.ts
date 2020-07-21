import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CampgroundsService } from 'src/app/services/campgrounds.service';

@Component({
  templateUrl: './cg-edit.component.html',
  styleUrls: ['./cg-edit.component.css']
})
export class CgEditComponent implements OnInit {
  filename: string = 'Choose File'
  fileSelected: File = null

  constructor(
    private fb: FormBuilder,
    private campgroundsService: CampgroundsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  editForm = this.fb.group({
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required]
  })

  async ngOnInit() {
    const response = await this.campgroundsService.infoCampgrounds(this.activatedRoute.snapshot.params.slug)
    if (!response) { this.toastr.warning('Campground not found'); return this.router.navigateByUrl('campgrounds') }
    this.editForm.patchValue({
      title: response.campgrounds[0].title,
      price: response.campgrounds[0].price,
      description: response.campgrounds[0].description
    })
  }

  async onSubmit() {
    const fb: FormData = new FormData()
    if (this.fileSelected) {
      fb.append('imageId', this.fileSelected, this.fileSelected.name)
    }
    fb.append('title', this.editForm.value.title)
    fb.append('description', this.editForm.value.description)
    fb.append('price', this.editForm.value.price)
    const response = await this.campgroundsService.editCampground(fb, this.activatedRoute.snapshot.params.slug)
    if (!response.campground) {
      return this.toastr.error(response.msg, 'Error')
    }
    this.toastr.success(response.msg, 'Success')
    this.router.navigateByUrl('campgrounds/' + response.campground.slug)
  }

  onFileChange(event) {
    this.fileSelected = event.target.files[0]
    this.filename = this.fileSelected.name
  }
}
