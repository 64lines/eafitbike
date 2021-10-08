import { Component, AfterViewInit } from '@angular/core';
import * as L from  'leaflet';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { ApigeolocationService } from 'src/app/services/apigeolocation.service';
import { element } from 'protractor';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements AfterViewInit {
  private map: any;
  public lst: any;


  private initMap(): void {
    this.map = L.map('map', {
      center: [ 28, 0 ],
      zoom: 2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

  }

  constructor(
    private apiGeolocation: ApigeolocationService,
  ) { 
    this.drawtBikes();
  }

  drawtBikes(){
    this.apiGeolocation.getLocation().subscribe( ResponseBike => {
      console.log(ResponseBike);
      this.lst = ResponseBike;
      console.log(this.lst);

      const  busyBike = L.icon({
        iconUrl: '../../../../assets/bicycle1.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
  
        const  availableBike = L.icon({
          iconUrl: '../../../../assets/bicycle2.svg',
          iconSize: [45, 105],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94]
        });
  
    
    for (let i in this.lst) {
      console.log(this.lst[i].name)
     
      let coordX = this.lst[i].coordinateX;
      coordX = coordX.replace(/,/g, '.');
      var y = parseFloat(coordX);

      let coordY = this.lst[i].coordinateY;
      coordY = coordY.replace(/,/g, '.');
      var x = parseFloat(coordY);
        
        if(this.lst[i].isActive == false){
          var c = L.marker([y, x], {icon: busyBike}).addTo(this.map).bindPopup(`Id: ${this.lst[i].id} Name: ${this.lst[i].name}`);
          console.log(c)
        }else{
          var c = L.marker([y, x], {icon: availableBike}).addTo(this.map).bindPopup(`Id: ${this.lst[i].id} Name: ${this.lst[i].name}`);
        }
    }
  
  });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}