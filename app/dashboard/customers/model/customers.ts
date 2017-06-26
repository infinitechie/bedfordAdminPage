export class Customers {
    constructor(
        public id: string,
        public name?: string,
        public email?: string,
        public expenditure?: number,
        public credit?: number,
        public hasApp?: string,
        public notes?: string,
        public bookingsPaid?: [number], //Epoch date number of when ordered
        public phoneNumber?: string,
        public bookingsMissed?: [number]
        
    ){ } 
}