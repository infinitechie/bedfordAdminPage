export class Bookings {
    constructor(
        public id: string,
        public customer: string,
        public time: string,
        public service?: string,
        public date?: number,
        public cost?: number,
        public type?: string,
        public booked?: string,
        public key?: string
    ){ } 
}

export class ServiceCost {
    constructor(
        public cost: number,
        public name: string,
        public description: string,
        public deal?: string,
        public barbers?: string[]

    ){}
}