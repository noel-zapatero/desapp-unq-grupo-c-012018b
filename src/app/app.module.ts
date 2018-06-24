import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from "ng2-translate";

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/user.service';
import { VehicleService } from './vehicles/vehicle.service';
import {Http} from "@angular/http";
import { PublicationService } from './publications/publication.service';
import {ProductComponent} from "./product/product.component";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    CallbackComponent,
    ProductComponent
  ],

  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: translateLoaderFact,
        deps: [Http]
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAulU6QWzQnOcPRlTM4ofpFXL1Dh65_Y4k'
    // })
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAulU6QWzQnOcPRlTM4ofpFXL1Dh65_Y4k'
    })
],
  providers: [AuthService,UserService,VehicleService,PublicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function translateLoaderFact(http: Http){
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
