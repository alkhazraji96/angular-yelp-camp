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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
