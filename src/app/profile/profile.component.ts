import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Vehicle } from '../model/vehicle.model';
import {VehicleService} from "../vehicles/vehicle.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AuthService]
})

export class ProfileComponent implements OnInit {

    private profile: any;

    public vehicleType: string;

    constructor(public auth: AuthService, private vehicleService:VehicleService) {
        this.auth.handleAuthentication();
     }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
          } else {
            this.auth.getProfile((err, profile) => {
              this.profile = profile;
            });
          }
    }

    loadVehicle() {
       const vehicle = {
           type : this.vehicleType
       }

       this.vehicleService.createVehicle(vehicle);
    }
}
