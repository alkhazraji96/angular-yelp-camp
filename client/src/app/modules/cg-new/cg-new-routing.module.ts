import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CgNewComponent } from 'src/app/components/cg-new/cg-new.component';

const routes: Routes = [{ path: '', component: CgNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CgNewRoutingModule { }
