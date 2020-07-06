import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


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
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MomentModule } from 'ngx-moment';


export function jwtOptionsFactory(authService:AuthService) {
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
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    })
  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
