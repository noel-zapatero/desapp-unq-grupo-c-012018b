import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Vehicle } from "../model/vehicle.model";

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
        return undefined;
    }

    createVehicle(vehicle: Vehicle): Observable<Vehicle> {
        return this.http.post<Vehicle>(
            this.URL,
            vehicle,
            this.httpOptions
        );
    }
     
}