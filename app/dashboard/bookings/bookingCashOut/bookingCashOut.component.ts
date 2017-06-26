import { Component, OnInit, trigger,transition,style,animate,group,state } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CustomerService } from '../../customers/service/customers.service';
import { Customers } from '../../customers/model/customers';

import { BookingService } from '../../bookings/service/bookings.service';
import { Bookings } from '../../bookings/model/bookings/bookings';
import { ServiceCost } from '../../bookings/model/bookings/bookings';

import { Staff } from '../../staff/model/staff';

import { BookingSharedService } from '../bookingSharedService';
import { TransactionService } from '../../transaction/service/transaction.service';
import { Transaction } from '../../transaction/model/transaction';


@Component({
    moduleId: module.id,
    styleUrls: ['bookingCashOut.component.css'],
    selector: 'bookingCashOut',
    templateUrl: 'bookingCashOut.component.html',
    animations: [
        trigger('cardicons', [
            state('*', style({
                '-ms-transform': 'translate3D(0px, 0px, 0px)',
                '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                '-moz-transform': 'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                transform:'translate3D(0px, 0px, 0px)',
                opacity: 1})),
                transition('void => *', [
                    style({opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform':'translate3D(0px, 150px, 0px)',
                        transform:'translate3D(0px, 150px, 0px)',
                    }),
                    animate('0.3s 0s ease-out')
                ])
        ])
    ]
})

export class BookingCashOutComponent implements OnInit {

    private userForm: FormGroup;
    private notBookedForm: FormGroup;

    constructor(private bookingService: BookingService, private formB: FormBuilder, private customerService: CustomerService, private sharedService: BookingSharedService, private transactionService: TransactionService) { }

    private dateSelectedToBePassed: string;
    private customerCredit: number;
    private costSelected: number;
    private serviceSelected: string;
    private emailSelected: string;
    private customerName: string;
    private customerId: string;
    private staffIndex: string;
    private date: Date;
    private transactions: Transaction[];
    private Bookings: Bookings[] = [];
    private isThereBookings: boolean;
    private customers: Customers[];
    private customerEmail = "";
    private expenditure: number;
    private customerNotes: string;

    private timeKeyTapped: string;
    
    private staffUID: string;

    private transaction: Transaction;
     
    private customer: Customers;
    private alreadyBooked: boolean;

    private costOfService = 0;
    private bookingTime: string;

    // private service = "";
     

    private currentUser = new Customers(null, null, null, 0, 0, "No", null, [111111], null, [111111]);
     

    ngOnInit(){
        this.customerEmail = "";
        this.getServices();
         
        

    this.grabCustomers();

    this.sharedService.customerEmailSelected.subscribe(message => this.customerEmail = message);
    this.sharedService.costSelected.subscribe(message => this.costSelected = message);
    this.sharedService.customerId.subscribe(message => this.customerId = message);
    this.sharedService.emailSelected.subscribe(message => this.emailSelected = message);
    this.sharedService.bookingService.subscribe(message => this.serviceSelected = message);
    this.sharedService.customerName.subscribe(message => this.customerName = message);
    this.sharedService.customerExpenditure.subscribe(message => this.expenditure = message);
    this.sharedService.customerCredit.subscribe(message => this.customerCredit = message);
    this.sharedService.customerNotes.subscribe(message => this.customerNotes = message);
    this.sharedService.transactionPassed.subscribe(message => this.transaction = message);
    this.sharedService.staffUID.subscribe(message => this.staffUID = message);
    this.sharedService.dateSelectedMain.subscribe(message => this.dateSelectedToBePassed = message);

    this.isThereBookings = false;

    this.notBookedForm = this.formB.group({
        country: [this.country],
        customerEmail: [this.customerEmail],
        service: [this.service],
        costOfService: [this.costOfService],


    });

    this.userForm = this.formB.group({

            name: [this.serviceSelected],
            email: [this.emailSelected],
            credit: [this.customerCredit],
            notes: [this.customerNotes],
            phoneNumber: [this.costSelected],
            expenditure: [this.expenditure],
            customerName: [this.customerName]
            // ,
            // bookingTime: [this.bookingTime]
            
        });
    
  
    }

    text: string;
    
    results: string[];

    country: string;
    
    countries: Customers[] = [];
        
    filteredCountriesSingle: Customers[] = [];

    email = "";

    grabCustomers(){
         this.customerService.grabUsersArray()
            .subscribe(countries => {
            console.log(countries.name);
            this.countries.push(countries);
            console.log(this.countries);


        },
        err => {
            console.error("unable to add bug -", err);
        });

    }

    getServices(){
     
    this.bookingService.getServiceCost()
        .subscribe(service => {
            console.log(service.name);
            this.servicesArray.push(service);
            console.log(this.servicesArray);

        },
        err => {
            console.error("unable to add bug -", err);
        });


}

    service: string;

    servicesArray: ServiceCost[] = [];

    filteredServicesSingle: ServiceCost[] = [];

    filteredServiceSingle(event){
        console.log(event);
        let query = event.query;  
        this.results = [];
        console.log("DSDSSDSDSDDSSDDSSDSDSDSDDSDSDS")
        console.log(this.servicesArray);
        this.filteredServicesSingle = this.filterService(query, this.servicesArray);

    }

      filterService(query, services: any[]):any[] {
          console.log(services);
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < services.length; i++) {
            let country = services[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country.name);
                // console.log(countries[i]);
                this.onChangeService(services[i]);
            }
            
            
        }
        return filtered;
        
    }

    onChangeService(event: ServiceCost){
         
        if (event.cost != null) {
            // this.sharedService.setService(event.name);
            this.sharedService.setCost(event.cost);

            this.notBookedForm.controls['service'].setValue(event.name);
            this.notBookedForm.controls['costOfService'].setValue(event.cost);

        } else {

            console.log("WWWWWWWWWWWWWWWWWWWWWW");
            // this.sharedService.setCustomerEmail(null);
        }

    }
    
    filterCountrySingle(event) {
        console.log(event);
        let query = event.query;  
        this.results = [];
        
        this.filteredCountriesSingle = this.filterCountry(query, this.countries);
        // this.onChange(event);

    }

     onChange(event: Customers){
         
        if (event.email != null)  {
            this.sharedService.setCustomerEmail(event.email);

            this.notBookedForm.controls['customerEmail'].setValue(event.email);
    //           this.notBookedForm = this.formB.group({

                
    //             customerEmail: [event.email]
               

    // });

        
            // this.onChange(event);
        } else {
            // this.sharedService.setCustomerEmail(null);
        }

    }


     filterCountry(query, countries: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country.name);
                // console.log(countries[i]);
                this.onChange(countries[i]);
            }
            
            
        }
        return filtered;
        
    }
    
    handleDropdown(event) {
        console.log("IIIIIIIIFIFIFI");
    }
    

    loggUser(booking: Bookings, staffArray: Staff[]){
     this.customer = null;
     console.log("booking.id");
     console.log(booking);
     this.timeKeyTapped = booking.key;
    
     this.bookingTime = booking.time;

     if (booking.service != null && booking.id != null) {
         this.isThereBookings = true;
         this.alreadyBooked = true;

    this.getPaidBookings(booking.id);
    this.getMissedBookings(booking.id);
    this.getUser(booking.id);
     
     var youth = true;


     var self = this

    $('td').click(function(){
    var index = $(this).index();
    if (youth) {
        console.log(staffArray[index- 1]);
        var staffId = staffArray[index- 1].email
        console.log(staffId);
        youth = false;
        self.date = new Date();
        var usableDate = self.date.toDateString();

        

    self.bookingService.servicesDbRef.child(booking.service).once('value').then(function(snapshot) {
        var num = snapshot.val().cost as number;
        console.log(num);

     var transaction = new Transaction(655656, usableDate, booking.customer, booking.service, booking.id, num, "Booking");
     self.sharedService.setTransaction(transaction);

        console.log(self.transaction);
        console.log("KKKKKKKKKKKKKKKK");
        console.log(booking.customer);

    self.sharedService.setCost(num);
    self.sharedService.setCustomerId(booking.id);
    
    self.sharedService.setService(booking.service);
    
    // self.sharedService.setStaffIndex(staffId);
    self.sharedService.setEmail(staffId);

    console.log(self.costSelected);

         self.userForm = self.formB.group({

            name: [self.serviceSelected],
            email: [self.emailSelected],
            credit: [self.customerCredit],
            notes: [self.customerNotes],
            phoneNumber: [self.costSelected],
            // country: [self.country],
            // customerEmail: [self.customerEmail],
            // service: [self.service],
            expenditure: [self.expenditure],
            customerName: [self.customerName]
            // bookingTime: [self.bookingTime]

//             All goes in one form (UserForm)
//             Cost of booking
//             Type of booking
//             Time selected*
//             Customer for booking


// All goes in dropdown box
//             Customer's name
//             Customer's number + email
//             Customer's bookings
//             Customer Credit
//             Notes
//             Expenditure
//             Loyalty
            
        });
    });

          
       


} else{
    

    }
    

});
     } 
//      else if (booking.id != "customerEmail/Id"){



// //This will be form for in detals are set 
// // create form here that is used if there is no booking.id (e.g. user has never used site before)


//      }
      else {

         

         this.alreadyBooked = false;
         console.log("We gots no id");
          this.date = new Date();
        var usableDate = this.date.toDateString()
        //  var transaction = new Transaction(655656, usableDate, booking.customer, booking.service, booking.id, num, "Booking");
         this.isThereBookings = false;

         var self = this

         this.notBookedForm = this.formB.group({
        country: [this.country],
        customerEmail: [this.customerEmail],
        service: [this.service],
        costOfService: [this.costOfService],


    });

         $('td').click(function(){
             
        var index = $(this).index();

    
         console.log(staffArray[index- 1]);
        var staffId = staffArray[index- 1].email
        console.log(staffId);
        self.sharedService.setEmail(staffId);

        var staffUID = staffArray[index-1].id
        console.log(staffUID);
        self.sharedService.setStaffUID(staffUID);

         });
         
     }

   

     console.log(booking);
 }



cashOut(){

        this.date = new Date();
        var usableDate = this.date.toDateString()
        var epochTime = this.date.getTime()
console.log(this.alreadyBooked);
    if (this.alreadyBooked == true){
        this.transaction.cost = Number(this.userForm.value["phoneNumber"]);
        this.transaction.customer = this.userForm.value["customerName"];
        this.transaction.customerId = this.userForm.value["email"];
        this.transaction.date = usableDate;
        this.transaction.id = epochTime;
        this.transaction.name = this.userForm.value["name"];
        this.transaction.serviceType = "Booking";

        // console.log(this.transaction);
        this.addUser(this.transaction);
        
        // this.sharedService.setTransaction()
    } else {
        var newTransaction = new Transaction(epochTime, usableDate,this.notBookedForm.value["country"],this.notBookedForm.value["service"],this.notBookedForm.value["customerEmail"], Number(this.notBookedForm.value["costOfService"]), "Booking");

        console.log(this.dateSelectedToBePassed)

console.log(this.staffUID, this.dateSelectedToBePassed,this.timeKeyTapped,this.notBookedForm.value["country"],this.notBookedForm.value["service"],this.notBookedForm.value["customerEmail"],"booked");
console.log(this.staffUID, this.dateSelectedToBePassed,this.timeKeyTapped,"Aoife Rhatigan","Wash & Cut","qj4un","booked");
        //HAVE TO CHANGE BOOKING DATA IN DATABASE TO BOOKED
        this.bookingService.updateBooking(this.staffUID, this.dateSelectedToBePassed,this.timeKeyTapped,"Aoife Rhatigan","Wash & Cut","qj4un","booked");


        this.addUser(newTransaction);
    }

    this.customerEmail = "";
    

 this.userForm = this.formB.group({
            customerName: [""],
            name: [""],
            email: [""],
            credit: [null],
            notes: [""],
            phoneNumber: [""],
            // country: [""],
            // customerEmail: [""],
            // service: [""],
            // costOfService: [null],
            expenditure: [null]
            // ,
            // bookingTime: [""]
            
        });
        this.bookingTime = "";

        this.Bookings = [];
        this.transaction = null;

        this.notBookedForm = this.formB.group({
        country: [""],
        customerEmail: [""],
        service: [""],
        costOfService: [null],


    });
    this.sharedService.setCost(null);
    this.sharedService.setCustomerId(null);
    this.sharedService.setCustomerName(null);
    // this.sharedService.setDate(null);
    this.sharedService.setEmail(null);
    this.sharedService.setService(null);
    this.sharedService.setStaffIndex(null);
    
}



getUser(userId: string){

var self = this
    this.bookingService.customersDbRef.child(userId).once('value').then(function(snapshot) {
     var username = snapshot.val() as Customers;
     self.customer = username
     self.sharedService.setCustomerExpenditure(self.customer.expenditure);
     self.sharedService.setCustomerCredit(self.customer.credit);
     self.sharedService.setCustomerNotes(self.customer.notes);
     self.sharedService.setCustomerName(self.customer.name);
    console.log(username);
    
    
    
    
    });


    // this.customers = []
    // this.customerService.grabUsersArray()
    //     .subscribe(user => {
    //         console.log(user);
    //         this.customers.push(user);
    //         console.log(this.customers);

    //     },
    //     err => {
    //         console.error("unable to add bug -", err);
    //     });
    // }
}
cancelTransaction(){
    this.customerEmail = "";
    this.sharedService.setCost(null);
    this.sharedService.setCustomerId(null);
    this.sharedService.setCustomerName(null);
    // this.sharedService.setDate(null);
    this.sharedService.setEmail(null);
    this.sharedService.setService(null);
    this.sharedService.setStaffIndex(null);

    this.userForm = this.formB.group({
            customerName: [""],
            name: [""],
            email: [""],
            credit: [null],
            notes: [""],
            phoneNumber: [""],
            // country: [""],
            // customerEmail: [""],
            // service: [""],
            // costOfService: [null],
            expenditure: [null]
            // ,
            // bookingTime: [""]
            
        });
        this.bookingTime = "";

        this.Bookings = [];
        this.transaction = null;

        this.notBookedForm = this.formB.group({
        country: [""],
        customerEmail: [""],
        service: [""],
        costOfService: [null],


    });
    
}

addUser(transaction: Transaction) {
        this.transactionService.addUser(transaction);
    }

getUserNow(){
        console.log("fsfffddfdfdf");
    }

     getPaidBookings(userId: string){
        
        this.customerService.getPaidBookingsCashOut(userId)
         .subscribe(user => {
            console.log(user);
            this.Bookings.push(user);
            console.log(this.Bookings);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }

    getMissedBookings(userId: string){
        
        this.customerService.getMissedBookingsCashOut(userId)
        .subscribe(user => {
            console.log(user);
            this.Bookings.push(user);
            console.log(this.Bookings);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }

    //  deleteUser(user?: Customers){

//     var milliseconds = (new Date).getTime();

//     this.date = new Date();
//     var usableDate = this.date.toDateString();

//     // this.transactions = null;

//     // console.log(this.date);
//     // console.log(usableDate);
//     // console.log(this.customerId);
//     // console.log(this.emailSelected);
//     // console.log(this.costSelected);
//     // console.log(this.serviceSelected);
//     // console.log(this.customerName);
    
//     this.transaction = new Transaction(milliseconds, usableDate, this.customerName, this.serviceSelected, this.customerId, this.costSelected, "Booking");
//     this.transactions.push(this.transaction);

//     console.log(this.transaction);
//          if (user) {
//             this.currentUser = new Customers(
//                 user.id,
//                 user.name,
//                 user.email,
//                 user.expenditure,
//                 user.credit,
//                 user.hasApp,
//                 user.notes,
//                 user.bookingsPaid,
//                 user.phoneNumber,
//                 user.bookingsMissed
//             );

//         if (user.credit > 0) {
//                 alert("Cannot Delete User with Money in Account");
//         } else {
            
//             this.customerService.customersRef.child(user.id).remove();
//         }
        
//     }

// }
}