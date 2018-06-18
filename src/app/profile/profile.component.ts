import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { Vehicle } from '../model/vehicle.model';
import { Observable } from "rxjs/Observable";
import { User } from '../model/user.model';

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
    public credits:number;
    public modifyCreditsCharge:number = 0;
    public modifyCreditsWithdraw:number = 0;

    constructor(
        public auth: AuthService, 
        private vehicleService: VehicleService , 
        private userService:UserService,
        private ref:ChangeDetectorRef
    ) 
        {
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

    chargeCredits() {
        this.userService.chargeCredits(this.profile.email ,this.modifyCreditsCharge)
        .subscribe(response => {
        });
    }

    withdrawCredits() {
        this.userService.withdrawCredits(this.profile.email ,this.modifyCreditsWithdraw)
        .subscribe(response => {
        });
    }

    preparePage(profile) {
       this.vehicle.ownerName = this.profile.given_name;
       this.vehicle.ownerLastName = this.profile.family_name; 
       this.vehicle.ownerEmail = this.profile.email;
        this.vehicleService.getVehiclesFromEmail(this.profile.email)
        .subscribe((vehicles: Vehicle[]) => {
            this.myVehicles$=vehicles;
        });
        // this.userService.getUserCredits(this.profile.email)
        // .subscribe(c => {
        //     //if (credits === undefined)
        //         this.credits = c;
        //         console.log(c);
        // });
        this.userService.getUserByEmail(this.profile.email)
        .subscribe((user:any) => {
            this.credits = user.credits;
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
        this.vehicle = vehicle;
        console.log('wiipoo');
    }

    publishById(vehicleId:number) {
        this.vehicleService.publishById(vehicleId)
            .subscribe(data => {

            })
    }

    modifyVehicle() {
        this.vehicleService.modifyVehicle(this.vehicle)
            .subscribe((vehicleResponse:Vehicle) => {
                
            })
    }

    deleteById(vehicleId:number) {
        this.vehicleService.deleteById(vehicleId)
        .subscribe(data => {

        })
    }
}
