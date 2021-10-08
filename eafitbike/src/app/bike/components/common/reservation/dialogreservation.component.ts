import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bike } from 'src/app/models/bike';
import { Reservation } from 'src/app/models/reservation';
import { ApireservationService } from 'src/app/services/apireservation.service';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
    templateUrl: 'dialoreservation.component.html'
})

export class DialogReservationComponent {
    public user: string = '';
    public idBike: string = '';
    public id: number = 0;

    constructor(
        public dialogRef: MatDialogRef<DialogReservationComponent>,       
        public apiReservation: ApireservationService,
        public socialAuthServive: SocialAuthService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public bike: Bike     
    ){
        if (this.bike !== null) {
            this.idBike = bike.id;
            this.socialAuthServive.authState.subscribe((user) => {
                this.user = user.email;
            });         
        }else{
            this.socialAuthServive.authState.subscribe((user) => {
                this.user = user.email;
            });   
        }
    }

    close(){
        this.dialogRef.close();
    }


    addReservation(){
        const reservation: Reservation = { user: this.user, idBike: this.idBike, id: 0  };
        this.apiReservation.add(reservation).subscribe(response => {
                this.dialogRef.close();
                this.snackBar.open('Reservation made successfully', '', {
                    duration: 2000
                });
        });
    }
} 
