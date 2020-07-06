import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CgInfoRoutingModule } from './cg-info-routing.module';
import { CgInfoComponent } from 'src/app/components/cg-info/cg-info.component';
import { CardInfoComponent } from 'src/app/components/cg-info/card-info/card-info.component';
import { SharedModule } from '../shared/shared.module';
import { MomentModule } from 'ngx-moment';




@NgModule({
  declarations: [
    CardInfoComponent,
    CgInfoComponent
  ],
  imports: [
    CommonModule,
    CgInfoRoutingModule,
    SharedModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 45
      }
    })
  ]
})
export class CgInfoModule { }
