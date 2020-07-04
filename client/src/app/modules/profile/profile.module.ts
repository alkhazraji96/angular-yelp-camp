import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

import { UsrCgComponent } from 'src/app/components/profile/usr-cg/usr-cg.component';
import { UsrDetailsComponent } from 'src/app/components/profile/usr-details/usr-details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    UsrCgComponent,
    UsrDetailsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
