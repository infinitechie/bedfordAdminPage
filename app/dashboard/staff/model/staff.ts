export class Staff {
    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public earnings?: number,
        public credit?: number,
        public notes?: string,
        public phoneNumber?: number,
        public imageUrl?: string,
        public imageStorageRef?: string,
        public unitsSold?: number,
        public dates?: [number],
        public productsSold?: [number],
        public transactions?: [number], //Epoch date number of when ordered
        public servicesList?: [string],
        public bookingsMissed?: [number],
        public highlighted?: boolean
        
    ){ } 
}