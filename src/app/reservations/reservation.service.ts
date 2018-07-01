import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reservation } from "../model/reservation.model";

@Injectable()
export class ReservationService {
    URL = 'http://localhost:8080/main/webservices/reservations';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    }

    constructor(private http:HttpClient) {

    }

    getReservations(pubId:number):Observable<Reservation[]> {
        return this.http.get<Reservation[]>(
            this.URL + '/reservationsof/' + pubId,
            this.httpOptions
        );
    }

    getMyReservationOf(userEmail:string, pubId:number):Observable<Reservation> {
        return this.http.get<Reservation>(
            this.URL + '/myreservationof/' + userEmail + '/' + pubId,
            this.httpOptions
        )
    }

    book(reservation:Reservation):Observable<Reservation> {
        return this.http.post<Reservation>(
            this.URL,
            reservation,
            this.httpOptions
        );
    }
}