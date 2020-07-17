import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { NewPassComponent } from './components/new-pass/new-pass.component';
import { PassVerifyTokenComponent } from './components/pass-verify-token/pass-verify-token.component';


const routes: Routes = [
{ path: '', component: LandingComponent },
{ path: 'campgrounds', component: CampgroundsComponent },
{ path: 'campgrounds/new', loadChildren: () => import('./modules/cg-new/cg-new.module').then(m => m.CgNewModule), canActivate: [AuthGuard] },
{ path: 'users', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
{ path: 'campgrounds/:slug', loadChildren: () => import('./modules/cg-info/cg-info.module').then(m => m.CgInfoModule) },
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'reset-password', component: PassResetComponent },
{ path: 'reset-password/:token', component: PassVerifyTokenComponent },
{ path: 'reset-password/:token/new-password', component: NewPassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
