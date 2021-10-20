import { HttpClientModule } from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthGuardService } from 'src/app/auth-guard.service';

import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
