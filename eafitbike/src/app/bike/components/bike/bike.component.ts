import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import { ApibikeService } from 'src/app/services/apibike.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ResponseBike } from '../../../models/responseBike';
import { DialogBikeComponent } from './dialog/dialogbike.component';
import { Bike } from 'src/app/models/bike';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { DialogReservationComponent } from '../common/reservation/dialogreservation.component';
import { ApireservationService } from 'src/app/services/apireservation.service';
import { Reservation } from 'src/app/models/reservation';



@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss']
})
export class BikeComponent implements OnInit {

  public lst: any;
  public columnas: string[] = ['id', 'name', 'mark', 'description', 'coordinateX', 'coordinateY', 'actions'];
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
    this.getBikes();
  }
  
  getBikes(){
  this.apiBike.getBikes().subscribe( ResponseBike => {
    console.log(ResponseBike);
    this.lst = ResponseBike;
  });
  }

  openAdd(){
    console.log('Geolocationrmación');
    const dialogRef = this.dialog.open(DialogBikeComponent, {
      width: this.widht
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBikes();
    });
  }


  openEdit(bike: Bike) {
    const dialogRef = this.dialog.open(DialogBikeComponent, {
      width: this.widht,
      data: bike
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBikes();
    });
  }

  delete(bike: Bike){
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.widht,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiBike.delete(bike.id).subscribe(response => {
            this.snackBar.open('Bicycle successfully removed', '', {
              duration: 2000
            });
            this.getBikes();
            
          
        })
      }
    });
  }

  reservation(bike: Bike){
    const dialogRef = this.dialog.open(DialogReservationComponent, {
      width: this.widht,
      data: bike
    });
  dialogRef.afterClosed().subscribe(result => {
    this.getBikes();
  });
}

}
