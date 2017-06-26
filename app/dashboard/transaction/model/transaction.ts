export class Transaction {
    constructor(
        public id: number,
        public date: string,
        public customer: string,
        public name?: string,
        public customerId?: string,
        public cost?: number,
        public serviceType?: string
    ){ } 
}