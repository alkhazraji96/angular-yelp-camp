import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';
import { LandingComponent } from './components/landing/landing.component';
import { CardComponent } from './components/campgrounds/card/card.component';
import { JumbotronComponent } from './components/campgrounds/jumbotron/jumbotron.component';
import { SharedModule } from './modules/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthService } from './services/auth.service';
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { NewPassComponent } from './components/new-pass/new-pass.component';
import { PassVerifyTokenComponent } from './components/pass-verify-token/pass-verify-token.component';


export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getAsyncToken();
    },
    whitelistedDomains: ["192.168.10.55:3000"],
    authScheme: "JWT "
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CampgroundsComponent,
    LandingComponent,
    CardComponent,
    JumbotronComponent,
    LoginComponent,
    RegisterComponent,
    PassResetComponent,
    NewPassComponent,
    PassVerifyTokenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FilterPipeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    SharedModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthService]
      }
    }),
    FormsModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 45
      }
    }),
    ToastrModule.forRoot({
      closeButton: true
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
