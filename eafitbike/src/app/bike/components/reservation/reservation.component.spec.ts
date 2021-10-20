import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { ApibikeService } from 'src/app/services/apibike.service';

import { ReservationComponent } from './reservation.component';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        RouterTestingModule,
        MatCardModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SocialLoginModule,
        HttpClientModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        {
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
        AuthGuardService
      ],
      declarations: [ ReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
