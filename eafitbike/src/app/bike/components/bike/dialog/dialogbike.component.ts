import { DecimalPipe } from '@angular/common';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bike } from '../../../../models/bike';
import { ApibikeService } from '../../../../services/apibike.service';

@Component({
    templateUrl: 'dialogbike.component.html'
})
export class DialogBikeComponent {
    public nombre = '';
    public marca = '';
    public descripcion = '';
    public coordenadaX = 0;
    public coordenadaY = 0;


    constructor(
        public dialogRef: MatDialogRef<DialogBikeComponent>,
        public apiBike: ApibikeService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public bike: Bike
    ){
        if (this.bike !== null) {
            this.nombre = bike.name;
            this.marca = bike.mark;
            this.descripcion = bike.description;
            this.coordenadaX = bike.coordinateX;
            this.coordenadaY = bike.coordinateY;
         }
    }

    close(): void {
        this.dialogRef.close();
    }

    editBike(): void {
        const bike: Bike = {
            name: this.nombre,
            id: this.bike.id,
            isActive: true,
            mark: this.marca,
            description: this.descripcion,
            coordinateX: this.coordenadaX,
            coordinateY: this.coordenadaY
        };

        this.apiBike.edit(bike).subscribe(response => {
                this.dialogRef.close();
                this.snackBar.open('Successfully edited bike', '', {
                    duration: 2000
                });
        });
    }

    addBike(): void {
        const bike: Bike = {
            name: this.nombre,
            id: '',
            isActive: true,
            mark: this.marca,
            description: this.descripcion,
            coordinateX: this.coordenadaX,
            coordinateY: this.coordenadaY
        };
        this.apiBike.add(bike).subscribe(response => {
                this.dialogRef.close();
                this.snackBar.open('Successfully inserted bike', '', {
                    duration: 2000
                });
        });
    }
}
