import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BikeRoutingModule } from './bike-routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { BikeComponent } from './components/bike/bike.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { DialogBikeComponent } from './components/bike/dialog/dialogbike.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { DialogDeleteComponent } from './components/common/delete/dialogdelete.component';
import { DialogReservationComponent } from './components/common/reservation/dialogreservation.component';


@NgModule({
  declarations: [
    WrapperComponent,
    BikeComponent,
    GeolocationComponent,
    ReservationComponent,
    LoginComponent,
    DialogBikeComponent,
    DialogDeleteComponent,
    DialogReservationComponent
  ],
  imports: [
    CommonModule,
    BikeRoutingModule,

    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ]
})
export class BikeModule { }
