import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CgInfoComponent } from 'src/app/components/cg-info/cg-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CgEditComponent } from 'src/app/components/cg-edit/cg-edit.component';



const routes: Routes = [
  { path: '', component: CgInfoComponent },
  { path: 'edit', component: CgEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CgInfoRoutingModule { }
