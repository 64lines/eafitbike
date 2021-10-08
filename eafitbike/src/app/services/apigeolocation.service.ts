import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike';
import { ResponseBike } from '../models/responseBike';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApigeolocationService {

  // url: string = 'http://159.122.174.54:31949/apigeolocation/api/bike';
  // url: string = 'http://apigeolocation-svc/api/bike';
     url: string = 'http://36.ae.7a9f.ip4.static.sl-reverse.com:31949/apigateway/geolocation';

  
  
  constructor(
    private _http: HttpClient
  ) { }

  getLocation(): Observable<ResponseBike>{
    return this._http.get<ResponseBike>(this.url);
  }

}
