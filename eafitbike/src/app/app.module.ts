import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import {AuthGuardService} from './auth-guard.service';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import { BikeComponent } from './bike/components/bike/bike.component';
import { LoginComponent } from './bike/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'bike', component: BikeComponent, canActivate: [AuthGuardService]},
      {path: '**', component: LoginComponent}
    ]),
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('713473821240-0jcsf7557g1tf1pe5qp2nbcgdeif81m3.apps.googleusercontent.com')
        }
      ]
    }
  },
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
