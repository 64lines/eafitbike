import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import { ApibikeService } from 'src/app/services/apibike.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ResponseBike } from '../../../models/responseBike';
import { Bike } from 'src/app/models/bike';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { DialogReservationComponent } from '../common/reservation/dialogreservation.component';
import { ApireservationService } from 'src/app/services/apireservation.service';
import { Reservation } from 'src/app/models/reservation';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  public user: string = ''; 
  public idBike: string = ''; 
  public id: number = 0;

  public lst: any;
  public columnas: string[] = ['id', 'user', 'idBike', 'startDate', 'endDate', 'actions'];
  readonly widht: string = '300px';
  
  constructor(
    private router: Router,
    private apiBike: ApibikeService,
    private apiReservation: ApireservationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public socialAuthServive: SocialAuthService) {
}

  logout(): void {
  this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }

  ngOnInit(): void {
    this.getReservetions();
  }
  
  getReservetions(){
  this.apiReservation.getReservetion().subscribe( Response => {
    console.log(Response);
    this.lst = Response;
  });
  }

  endreservation(reservation: Reservation){
    this.apiReservation.edit(reservation).subscribe(response => {
          this.snackBar.open('Reservation finalized successfully', '', {
              duration: 2000
    });
    this.getReservetions();
  });
}


  reservation(bike: Bike){
  const dialogRef = this.dialog.open(DialogReservationComponent, {
    width: this.widht,
    data: bike
  });
dialogRef.afterClosed().subscribe(result => {
  this.getReservetions();
});
}

addReservation(){
  const dialogRef = this.dialog.open(DialogReservationComponent, {
    width: this.widht,
  });
dialogRef.afterClosed().subscribe(result => {
  this.getReservetions();
});
}

}