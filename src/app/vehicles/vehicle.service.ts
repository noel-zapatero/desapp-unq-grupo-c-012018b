import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Vehicle } from "../model/vehicle.model";
import { httpOptions } from '../common.functions';
import { AuthService } from '../auth/auth.service';

(window as any).global = window;

@Injectable() 
export class VehicleService {

    URL = 'http://localhost:8080/main/webservices/vehicles';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
    }

    constructor(private http: HttpClient) { }

    getVehiclesFromUserId(id: number): Observable<Vehicle> {
        // TODO: implementar 
        return undefined;
    }

    getVehiclesFromEmail(email:string): Observable<Vehicle> {
        return this.http.get<Vehicle>(
            this.URL + "/from/user/" + email,
            this.httpOptions
        );
    }

    createVehicle(vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(
            this.URL,
            vehicle,
            this.httpOptions
        )
    }
     
}