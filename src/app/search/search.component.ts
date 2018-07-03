import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publications/publication.service';
import { Publication } from '../model/publication.model';
import { VehicleService } from '../vehicles/vehicle.service';
import { Vehicle } from '../model/vehicle.model';
import {PagerService} from "../pager/pager.service";

declare var google: any;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

    public lat:number;
    public lng:number;
    public mapZoom:number = 15;

    public publications:Publication[] = [];
    public vehicles:Vehicle[] = [];
    public latLngs = [];

    public pager:any = {};
    public pagedItems:any[];

    constructor(
        private publicationService:PublicationService,
        private vehicleService:VehicleService,
        private pagerService:PagerService
    ) {
        if (navigator) {   
            navigator.geolocation.getCurrentPosition( pos => {
                this.lng = +pos.coords.longitude;
                this.lat = +pos.coords.latitude;
            });
        }
    }

    ngOnInit() {
        const that = this;
        setTimeout(() => {
            that.publicationService.getAllPublications()
        .subscribe((publications:Publication[]) => {
            that.publications = publications;
            that.publications.forEach((publication:Publication) => {
                that.vehicleService.getById(publication.vehicleOfferedId)
                .subscribe((vehicle:Vehicle) => {
                    this.vehicles.push(vehicle);
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address':vehicle.withdrawAddress}, (results, status) => {
                        that.latLngs.push({
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                            pubId: publication.publicationId,
                            publication: publication,
                            vehicle: vehicle 
                        });
                    });
                });
            });
        });
        }, 
        500);
        this.setPage(1);
    }

    setPage(page: number){
        this.publicationService.getAllPublications()
            .subscribe((publications:Publication[]) =>{
                this.publications = publications;
                this.pager = this.pagerService.getPager(this.publications.length, page);
                this.pagedItems = this.publications.slice(this.pager.startIndex, this.pager.endIndex + 1);
            })

    }

    getFromMyVehiclesById(publication:Publication):Vehicle {
        return this.vehicles.filter(
            (vehicle:Vehicle) => vehicle.vehicleId == publication.vehicleOfferedId
        )[0];
    }

}