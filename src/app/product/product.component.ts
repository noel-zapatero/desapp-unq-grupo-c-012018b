import { Component, OnInit } from '@angular/core';
import {Publication} from "../model/publication.model";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

    public product: any;
    public publication: Publication;

    constructor() { }

    ngOnInit() {}

}
