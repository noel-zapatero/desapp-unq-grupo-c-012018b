import { Component, OnInit } from '@angular/core';
import {Publication} from "../model/publication.model";
import {ActivatedRoute} from "@angular/router";
import {PublicationService} from "../publications/publication.service";
import {Vehicle} from "../model/vehicle.model";
import {VehicleService} from "../vehicles/vehicle.service";
import { AuthService } from '../auth/auth.service';
import { Reservation } from '../model/reservation.model';
import { ReservationService } from '../reservations/reservation.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

    public id: number;
    public profile:any;
    public sub: any;
    public publication: Publication;
    public vehicleSelected: Vehicle;
    public myReservation:Reservation;
    public ratingClient:number;
    public ratingOwner:number;

    public isOwner:boolean = false;
    public offerIsAccepted:boolean = false;
    public vehicleRetired:boolean = false;

    public dateFrom:string;
    public dateTo:string;

    public myOffers:Reservation[] = [];
    public myAcceptedOffers:Reservation[] = [];
    public myRetires:Reservation[] = [];
    public myReturns:Reservation[] = [];

    constructor(private route: ActivatedRoute,
                private publicationService:PublicationService,
                private vehicleService:VehicleService,
                private auth:AuthService,
                private reservationService:ReservationService) {
                    this.auth.handleAuthentication();
                 }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['pubId'];
            this.publicationService.getPublicationById(this.id)
            .subscribe((publication:Publication) => {
                this.publication = publication;
                this.vehicleService.getById(this.publication.vehicleOfferedId)
                .subscribe((vehicle:Vehicle) => {
                    this.vehicleSelected = vehicle;
                })
            });
            this.setUpUserProfile();
        })
    }

    setUpUserProfile() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.setUpPage();
          } else {
            this.auth.getProfile((err, profile) => {
              this.profile = profile;
              this.setUpPage();
            });
        }
    }

    setUpPage() {
        this.publicationService.isOwner(this.profile.email, this.id)
        .subscribe((response:boolean) => {
            if (response) 
                this.setUpOwnerPage();
            else 
                this.setUpNotOwnerPage();
        })
    }

    setUpOwnerPage() {
        this.isOwner = true;
        this.reservationService.getReservations(this.id)
        .subscribe((reservations:Reservation[]) => {
            reservations.forEach((reservation:Reservation) => {
                console.log(reservation.retireState);
                if (reservation.accepted) {
                    this.myAcceptedOffers.push(reservation);
                    if (reservation.retireState === 'RETIRING') {
                        this.myRetires.push(reservation);
                    } else if (reservation.retireState === 'RETURNING') {
                        this.myReturns.push(reservation);
                    } //else if (reservation.retireState === 'RETURNED')  {
                        //this.myAcceptedOffers.push(reservation);
                    //}
                } else {
                    this.myOffers.push(reservation);
                }
            });
        });
    }

    setUpNotOwnerPage() {
        this.reservationService.getMyReservationOf(this.profile.email, this.id)
        .subscribe((reservation:Reservation) => {
            if (reservation !== null) {
                this.offerIsAccepted = 
                    reservation.accepted && reservation.retireState === 'AWAITINGRETIRE';

                this.myReservation = reservation;
            }
            this.vehicleRetired = reservation.retireState === 'RETIRED';
        });
    }

    sendReservation() {
        const from:String[] = this.dateFrom.split('-');
        const to:String[] = this.dateTo.split('-');
        const reservation:Reservation = new Reservation(
            undefined,
            false,
            Number(from[0]), 
            Number(from[1]), 
            Number(from[2]), 
            Number(to[0]), 
            Number(to[1]), 
            Number(to[2]),
            this.profile.email,
            this.id,
            'AWAITINGRETIRE'
        );
        this.reservationService.book(reservation)
        .subscribe((reservation:Reservation) => {
            
        });
    }

    acceptReservation(reservation:Reservation) {
        this.reservationService.accept(reservation)
        .subscribe((response:boolean) => {
            this.myOffers = this.myOffers.filter(
                (r:Reservation) => r.reservationId !== reservation.reservationId
            );
        });
    }

    declineReservation(reservation:Reservation) {
        this.reservationService.decline(reservation)
        .subscribe((response:boolean) => {

        });
    }

    retireVehicle() {
        this.reservationService.retireVehicle(this.myReservation)
        .subscribe((reservation:Reservation) => {
            
        });
    }

    acceptRetire(reservation:Reservation) {
        this.reservationService.acceptRetire(reservation)
        .subscribe((reservation:Reservation) => {
            this.myRetires = this.myRetires.filter(
                (r:Reservation) => r.reservationId !== reservation.reservationId
            );
        });
    }

    declineRetire(reservation:Reservation) {
        this.myRetires = this.myRetires.filter(
            (r:Reservation) => r.reservationId !== reservation.reservationId
        );
    }

    //TODO: Meter el RATING
    returnVehicle() {
        this.reservationService.returnVehicle(this.myReservation)
        .subscribe((reservation:Reservation) => {

        });
    }

    //TODO: Meter el RATING
    acceptReturn(reservation:Reservation) {
        this.reservationService.acceptReturn(reservation)
        .subscribe((reservation:Reservation) => {
            this.myReturns = this.myReturns.filter(
                (r:Reservation) => r.reservationId !== reservation.reservationId
            );
        });
    }

    declineReturn(reservation:Reservation) {

    }

}
