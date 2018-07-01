import { Component, OnInit } from '@angular/core';
import {Publication} from "../model/publication.model";
import {ActivatedRoute} from "@angular/router";
import {PublicationService} from "../publications/publication.service";
import {Vehicle} from "../model/vehicle.model";
import {VehicleService} from "../vehicles/vehicle.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

    id: number;
    private sub: any;
    public publication: Publication;
    public vehicleSelected: Vehicle;

    constructor(private route: ActivatedRoute,
                private publicationService:PublicationService,
                private vehicleService:VehicleService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['pubId'];
        })
        this.publicationService.getPublicationById(this.id)
            .subscribe((publication:Publication) => {
                this.publication = publication;
                console.log(this.publication);

                this.vehicleService.getById(this.publication.vehicleOfferedId)
                .subscribe((vehicle: Vehicle) => {
                    this.vehicleSelected = vehicle;
                })
            });
        // this.vehicleSelected = new Vehicle(
        //     undefined,
        //     'Auto',
        //     2,
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     '',
        //     undefined,
        //     '',
        //     '',
        //     '',
        //     ''
        // );
        
    }

}
