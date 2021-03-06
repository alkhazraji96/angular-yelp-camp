import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CgNewRoutingModule } from './cg-new-routing.module';3
import { CgNewComponent } from 'src/app/components/cg-new/cg-new.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CgNewComponent],
  imports: [
    CommonModule,
    CgNewRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CgNewModule { }
