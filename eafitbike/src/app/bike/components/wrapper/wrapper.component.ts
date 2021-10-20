import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  isExpanded = false;

  constructor(
    private router: Router,
    public socialAuthServive: SocialAuthService
  ) {}

  logout(): void {
  this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }
  ngOnInit(): void {
  }
}
