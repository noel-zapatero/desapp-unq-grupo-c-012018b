import { Vehicle } from "../model/vehicle.model";

export class Publication{
    constructor(
        public publicationId:number,
        public vehicleOffered:Vehicle,
        public startYear:number,
        public startMonth:number,
        public startDayOfMonth:number,
        public endYear:number,
        public endMonth:number,
        public endDayOfMonth:number
    ) { }
}