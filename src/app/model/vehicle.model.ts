export class Vehicle {

    constructor(
        public vehicleId: number,
        public type: string,
        public passengerCapacity: number,
        public brandModel: string,
        public zone: string,
        public withdrawAddress: string,
        public returnAddress: string,
        public description: string,
        public contactPhone: string,
        public ownerId: number,
        public ownerName: string,
        public ownerLastName: string,
        public ownerEmail: string,
        public imageUrl: String
    ) { }
    
}