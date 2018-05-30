import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient } from "@angular/common/http";

import { Vehicle } from "../model/vehicle.model";

(window as any).global = window;

@Injectable() 
export class VehicleService {

    constructor(private http: HttpClient) { }

    getVehiclesFromUserId(id: number): Observable<Vehicle> {
        return this.http.get<Vehicle>(`http://localhost:4200/vehicles/from/user/${id}`);
    }
    
}