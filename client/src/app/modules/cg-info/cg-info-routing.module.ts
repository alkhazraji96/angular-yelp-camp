import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CgInfoComponent } from 'src/app/components/cg-info/cg-info.component';



const routes: Routes = [{path: '', component: CgInfoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CgInfoRoutingModule { }
