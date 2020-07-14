import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CgInfoRoutingModule } from './cg-info-routing.module';
import { CgInfoComponent } from 'src/app/components/cg-info/cg-info.component';
import { CgEditComponent } from 'src/app/components/cg-edit/cg-edit.component';
import { ReviewEditComponent } from 'src/app/components/cg-info/review-edit/review-edit.component';
import { ReviewCreateComponent } from 'src/app/components/cg-info/review-create/review-create.component';
import { ReviewListComponent } from 'src/app/components/cg-info/review-list/review-list.component';
import { CardInfoComponent } from 'src/app/components/cg-info/card-info/card-info.component';
import { SharedModule } from '../shared/shared.module';
import { MomentModule } from 'ngx-moment';
import { NgxStarsModule } from 'ngx-stars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardInfoComponent,
    CgInfoComponent,
    ReviewCreateComponent,
    ReviewEditComponent,
    ReviewListComponent,
    CgEditComponent
  ],
  imports: [
    CommonModule,
    CgInfoRoutingModule,
    NgxStarsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 45
      }
    })
  ]
})
export class CgInfoModule { }
