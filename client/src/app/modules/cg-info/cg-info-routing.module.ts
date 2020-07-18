import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CgInfoComponent } from 'src/app/components/cg-info/cg-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CgEditComponent } from 'src/app/components/cg-edit/cg-edit.component';
import { ReviewEditComponent } from 'src/app/components/cg-info/review-edit/review-edit.component';
import { AuthGuard } from 'src/app/guards/auth.guard';



const routes: Routes = [
  { path: '', component: CgInfoComponent },
  { path: 'edit', component: CgEditComponent, canActivate: [AuthGuard] },
  { path: 'review/:review_id/edit', component: ReviewEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CgInfoRoutingModule { }
