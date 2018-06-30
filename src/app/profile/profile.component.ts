import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { VehicleService } from '../vehicles/vehicle.service';
import { Vehicle } from '../model/vehicle.model';
import { PublicationService } from '../publications/publication.service';
import { Publication } from '../model/publication.model';

declare var google: any;

@Component({ 
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [AuthService]
})

export class ProfileComponent implements OnInit {

    public profile:any;
    public vehicle:Vehicle;
    public vehicleSelected:Vehicle;
    public vehicleTypes:string[] = ['Auto', 'Moto', 'PickUp'];
    public vehicleCapacities:number[] = [2,4,6,8,10,16,24,48,60];
    public myVehicles$:Vehicle[] = [];
    public myPublications$:Publication[] = [];
    public activeIdString:String = 'myVehiclesTab';
    public credits:number;
    public modifyCreditsCharge:number = 0;
    public modifyCreditsWithdraw:number = 0;
    public dateFrom:String;
    public dateTo:String;
    public rentFeeHour:number;
    public rentFeeDay:number;

    public lat:any;
    public lng:any;

    public withdrawLat:any = this.lat;
    public withdrawLng:any = this.lng;

    public mapZoom = 16;

    constructor(
        public auth: AuthService, 
        private vehicleService: VehicleService , 
        private userService:UserService,
        private ref:ChangeDetectorRef,
        private publicationService:PublicationService
    ) 
        {
        this.auth.handleAuthentication();

        if (navigator)
        {   
            navigator.geolocation.getCurrentPosition( pos => {
                this.lng = +pos.coords.longitude;
                this.lat = +pos.coords.latitude;
            });
        }

     }

    ngOnInit() {
        this.setUpVehicles();
        this.setUpUserProfile();
        this.setUpWithdrawMap();
    }

    setUpWithdrawMap() {
        
    }

    setUpUserProfile() {
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

    setUpVehicles() {
        this.vehicle = new Vehicle(
            undefined,
            'Auto',
            2,
            '',
            '',
            '',
            '',
            '',
            '',
            undefined,
            '',
            '',
            '',
            ''
        );
        this.vehicleSelected = new Vehicle(
            undefined,
            'Auto',
            2,
            '',
            '',
            '',
            '',
            '',
            '',
            undefined,
            '',
            '',
            '',
            ''
        );
    }

    deletePublication(publicationId:number) {
        this.publicationService.deletePublication(publicationId)
        .subscribe(response => {

        });
        location.reload();
    }

    chargeCredits() {
        this.userService.chargeCredits(this.profile.email ,this.modifyCreditsCharge)
        .subscribe((response:number) => {
            this.credits=response;
        });
    }

    onMapWithdrawClick(event) {
        console.log(event);
        this.withdrawLat = event.coords.lat;
        this.withdrawLng = event.coords.lng;
        var latlng = {
            lat: parseFloat(this.withdrawLat), 
            lng: parseFloat(this.withdrawLng)
        };
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location':latlng}, (results, status) => {
            this.vehicle.withdrawAddress = results[0].formatted_address;
        });
    }

    onMapReturnClick(event) {
        console.log(event);
        this.withdrawLat = event.coords.lat;
        this.withdrawLng = event.coords.lng;
        var latlng = {
            lat: parseFloat(this.withdrawLat),
            lng: parseFloat(this.withdrawLng)
        };
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location':latlng}, (results, status) => {
            this.vehicle.returnAddress = results[0].formatted_address;
        });
    }

    searchByAddress(){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address':this.vehicle.withdrawAddress}, (results, status) => {
            this.withdrawLat = results[0].geometry.location.lat();
            this.withdrawLng = results[0].geometry.location.lng();
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();
            this.vehicle.withdrawAddress = results[0].formatted_address;
            this.vehicleSelected.withdrawAddress = results[0].formatted_address;
        });
    }

    //TODO: arreglar este codigo choto
    searchByAddress2(){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address':this.vehicle.withdrawAddress}, (results, status) => {
            this.withdrawLat = results[0].geometry.location.lat();
            this.withdrawLng = results[0].geometry.location.lng();
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();
            this.vehicle.returnAddress = results[0].formatted_address;
            this.vehicleSelected.returnAddress = results[0].formatted_address;
        });
    }

    withdrawCredits() {
        this.userService.withdrawCredits(this.profile.email ,this.modifyCreditsWithdraw)
        .subscribe((response:number) => {
            this.credits = response;
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
        this.userService.getUserByEmail(this.profile.email)
        .subscribe((user:any) => {
            this.credits = user.credits;
        });
        this.publicationService.getAllPublicationsFromUserEmail(this.profile.email)
        .subscribe((publications:Publication[]) => {
            this.myPublications$=publications;
        });
    }

    getFromMyVehiclesById(publication:Publication):Vehicle {
        return this.myVehicles$.filter(
            (vehicle:Vehicle) => vehicle.vehicleId == publication.vehicleOfferedId
        )[0];
    }

    createVehicle() {
        this.vehicleService.createVehicle(this.vehicle)
        .subscribe((vehicle:Vehicle) => { 
            this.myVehicles$.push(vehicle);
            this.activeIdString = 'myVehiclesTab';
        });
        location.reload();
    }

    startModifying(vehicle:Vehicle) {
        this.vehicleSelected = vehicle
        //this.vehicle = vehicle;
    }

    startPub(vehicle:Vehicle){
        this.vehicleSelected = vehicle
    }

    publishById(vehicleId:number) {
        const from:String[] = this.dateFrom.split('-');
        const to:String[] = this.dateTo.split('-');
        console.log(from);
        console.log(to);
        this.publicationService.publish(new Publication(
            null,
            vehicleId,
            Number(from[0]), 
            Number(from[1]), 
            Number(from[2]), 
            Number(to[0]), 
            Number(to[1]), 
            Number(to[2]),
            this.rentFeeHour,
            this.rentFeeDay)
        ).subscribe((responsePublication:Publication) => {
            // TODO 
        });
        location.reload();
    }

    modifyVehicle() {
        console.log(this.vehicleSelected);
        this.vehicleService.modifyVehicle(this.vehicleSelected)
        .subscribe((vehicleResponse:Vehicle) => {
            
        })
    }

    deleteById(vehicleId:number) {
        this.vehicleService.deleteById(vehicleId)
        .subscribe(data => {

        });
        location.reload();
    }
}
