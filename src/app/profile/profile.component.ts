import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { Vehicle } from '../model/vehicle.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AuthService]
})

export class ProfileComponent implements OnInit {

    public profile:any;
    public vehicle:Vehicle;
    public vehicleTypes:string[] = ['Auto', 'Moto', 'PickUp'];
    public vehicleCapacities:number[] = [2,4,6,8,10,16,24,48,60];
    public myVehicles:Vehicle[] = [];

    constructor(public auth: AuthService, private vehicleService: VehicleService) {
        this.auth.handleAuthentication();
     }

    ngOnInit() {
        this.vehicle = new Vehicle(
            undefined,
            'Auto',
            2,
            '',
            '',
            '',
            '',
            '',
            0,
            0,
            undefined,
            '',
            '',
            ''
        ); 

        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.preparePage(this.profile);
          } else {
            this.auth.getProfile((err, profile) => {
              this.profile = profile;
              this.preparePage(profile);
            });
        }
    }

    getVehiclesFromEmail(email:string) {
        this.vehicleService.getVehiclesFromEmail(email)
        .subscribe(data => {
            
        });
    }

    preparePage(profile) {
       this.vehicle.ownerName = this.profile.given_name
       this.vehicle.ownerLastName = this.profile.family_name 
       this.vehicle.ownerEmail = this.profile.email
       this.getVehiclesFromEmail(this.profile.email);
    }

    createVehicle() {
       this.vehicleService.createVehicle(this.vehicle)
       .subscribe(data => { 

       });
    }

}
