import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeComponent } from './components/bike/bike.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'bike',
        component: BikeComponent
      },
      {
        path: 'geolocation',
        component: GeolocationComponent
      },
      {
        path: 'reservation',
        component: ReservationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/bike',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BikeRoutingModule { }
