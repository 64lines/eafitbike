import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike';
import { Reservation } from '../models/reservation';
import { ResponseBike } from '../models/responseBike';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApireservationService {

  // url: string = 'http://159.122.174.54:31949/apireservations/api/reservation';
  // url: string = 'http://apireservations-svc/api/reservation';
  url = 'http://36.ae.7a9f.ip4.static.sl-reverse.com:31949/apigateway/reservation';

  constructor(
    private http: HttpClient
  ) { }

  getReservetion(): Observable<Response>{
    return this.http.get<Response>(this.url);
  }

  add(reservation: Reservation): Observable<Response> {
    return this.http.post<Response>(this.url, reservation, httpOption);
  }

  edit(reservation: Reservation): Observable<Response> {
    return this.http.put<Response>(`${this.url}/${reservation.id}`, reservation, httpOption);
  }
}
