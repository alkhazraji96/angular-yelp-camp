import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { CampgroundsService } from 'src/app/services/campgrounds.service';

@Component({
  templateUrl: './cg-new.component.html',
  styleUrls: ['./cg-new.component.css']
})
export class CgNewComponent implements OnInit {
  
  constructor(private campgroundService: CampgroundsService) { }

  ngOnInit(): void {
  }

  async onAtSubmit(cgNewForm: NgForm) {
    const response = await this.campgroundService.postCampground(cgNewForm.value)
    console.log(response);
  }

}
