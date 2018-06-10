import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { Vehicle } from '../model/vehicle.model';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AuthService]
})

export class ProfileComponent implements OnInit {

    public profile:any;
    public vehicle:Vehicle;
    public modVehicle:Vehicle;
    public vehicleTypes:string[] = ['Auto', 'Moto', 'PickUp'];
    public vehicleCapacities:number[] = [2,4,6,8,10,16,24,48,60];
    public myVehicles$:Vehicle[] = [];
    public activeIdString:String = 'myVehiclesTab';

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

    preparePage(profile) {
       this.vehicle.ownerName = this.profile.given_name;
       this.vehicle.ownerLastName = this.profile.family_name; 
       this.vehicle.ownerEmail = this.profile.email;
        this.vehicleService.getVehiclesFromEmail(this.profile.email)
        .subscribe((vehicles: Vehicle[]) => {
            this.myVehicles$=vehicles;
        });
    }

    createVehicle() {
        this.vehicleService.createVehicle(this.vehicle)
        .subscribe((vehicle:Vehicle) => { 
            this.myVehicles$.push(vehicle);
            this.activeIdString = 'myVehiclesTab';
        });
    }

    startModifying(vehicle:Vehicle) {
        this.modVehicle = vehicle;
    }

    modifyVehicle() {
        this.vehicleService.modifyVehicle(this.modVehicle)
            .subscribe((vehicleResponse:Vehicle) => {
                
            })
    }

    deleteById(vehicleId:number) {
        this.vehicleService.deleteById(vehicleId)
        .subscribe(data => {

        })
    }
}
