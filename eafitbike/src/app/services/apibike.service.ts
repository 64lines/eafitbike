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
export class ApibikeService {

  // url: string = 'http://159.122.174.54:31949/apibikes/api/bike';
  // url: string = 'http://apibikes-svc/api/bike';
  url = 'http://36.ae.7a9f.ip4.static.sl-reverse.com:31949/apigateway/bike';

  constructor(
    private http: HttpClient
  ) { }

  getBikes(): Observable<ResponseBike>{
    return this.http.get<ResponseBike>(this.url);
  }

  add(bike: Bike): Observable<ResponseBike> {
    return this.http.post<ResponseBike>(this.url, bike, httpOption);
  }

  edit(bike: Bike): Observable<ResponseBike> {
    return this.http.put<ResponseBike>(`${this.url}/${bike.id}`, bike, httpOption);
  }

  delete(id: string): Observable<ResponseBike> {
    return this.http.delete<ResponseBike>(`${this.url}/${id}`);
  }
}
