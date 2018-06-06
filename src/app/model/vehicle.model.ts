export class Vehicle {

    constructor(
        public vehicleId: number,
        public type: string,
        public passengerCapacity: number,
        public zone: string,
        public withdrawAddress: string,
        public returnAddress: string,
        public description: string,
        public contactPhone: string,
        public rentFeeDay: number,
        public rentFeeHour: number,
        public ownerId: number,
        public ownerName: string,
        public ownerLastName: string,
        public ownerEmail: string
    ) { }
    
}