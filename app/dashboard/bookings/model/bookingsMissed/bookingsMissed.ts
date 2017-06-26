export class BookingsMissed {
    constructor(
        public id: number,
        public customer: string,
        public name?: string,
        public date?: number,
        public cost?: number,
    ){ } 
}