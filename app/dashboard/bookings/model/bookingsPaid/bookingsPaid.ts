export class BookingsPaid {
    constructor(
        public id: number,
        public customer: string,
        public name?: string,
        public date?: number,
        public cost?: number,
    ){ } 
}