import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { CampgroundsService } from 'src/app/services/campgrounds.service';

@Component({
  templateUrl: './cg-new.component.html',
  styleUrls: ['./cg-new.component.css']
})
export class CgNewComponent implements OnInit {
  filename = 'Choose File'
  fileSelcected: File = null
  
  constructor(private campgroundService: CampgroundsService) { }

  ngOnInit(): void {
  }

  async onAtSubmit(cgNewForm: NgForm) {
    const fb:FormData = new FormData()
    fb.append('imageId', this.fileSelcected, this.fileSelcected.name)
    fb.append('title', cgNewForm.value.title)
    fb.append('description', cgNewForm.value.description)
    fb.append('price', cgNewForm.value.price)
    const response = await this.campgroundService.postCampground(fb)
    console.log(response)
  }

  onFileChange(event) {
    this.fileSelcected = event.target.files[0]
    this.filename = this.fileSelcected.name
  }

}
