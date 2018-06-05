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

    constructor(private http: HttpClient) { }

    getVehiclesFromUserId(id: number): Observable<Vehicle> {
        // TODO: implementar 
        return undefined;
    }

    createVehicle(vehicle, auth:AuthService): Observable<Vehicle> {
        return this.http.post('', vehicle, httpOptions(auth));
    }
     
}