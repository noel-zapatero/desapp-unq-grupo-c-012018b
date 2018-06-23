export class Publication{
    constructor(
        public publicationId:number,
        public vehicleOfferedId:number,
        public startYear:number,
        public startMonth:number,
        public startDayOfMonth:number,
        public endYear:number,
        public endMonth:number,
        public endDayOfMonth:number
    ) { }
}