import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Vehicle } from '../model/vehicle.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AuthService]
})

export class ProfileComponent implements OnInit {

    private profile: any;

    public type: string;

    constructor(public auth: AuthService) {
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
       
    }

    setVehicleType(vehicleType) {
        this.type = vehicleType;
    }

}
