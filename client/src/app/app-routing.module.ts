import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
{ path: '', component: LandingComponent },
{ path: 'campgrounds', component: CampgroundsComponent },
{ path: 'campgrounds/new', loadChildren: () => import('./modules/cg-new/cg-new.module').then(m => m.CgNewModule) },
{ path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
{ path: 'campgrounds/:id', loadChildren: () => import('./modules/cg-info/cg-info.module').then(m => m.CgInfoModule) },
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
