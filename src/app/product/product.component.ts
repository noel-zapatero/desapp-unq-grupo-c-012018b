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

    public isOwner:boolean = false;

    public dateFrom:string;
    public dateTo:string;

    public myOffers:Reservation[] = [];
    public myAcceptedOffers:Reservation[] = [];

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
                if (reservation.accepted)
                    this.myAcceptedOffers.push(reservation);
                else 
                    this.myOffers.push(reservation);
            });
        });
    }

    setUpNotOwnerPage() {
        this.reservationService.getMyReservationOf(this.profile.userEmail, this.id)
        .subscribe((reservation:Reservation) => {
            
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
            this.id
        );
        this.reservationService.book(reservation)
        .subscribe((reservation:Reservation) => {
            
        });
    }

}
