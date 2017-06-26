import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Customers } from '../model/customers';
import { Bookings } from '../../bookings/model/bookings/bookings';

import { FirebaseConfigService } from '../../../core/services/firebase-config.service';


@Injectable()
export class CustomerService { 

// user: Observable<firebase.User>;
    email: string;
    password:string;
    errorMessage: string;

    constructor(private fire: FirebaseConfigService /*, public afAuth: AngularFireAuth*/) { 
        // this.user = afAuth.authState;
     
    }

    private bookingsDbRef = this.fire.database.ref().child('/services');
    public barbersDBRef = this.fire.database.ref().child('/barbers').child('/barbers');
    public customersRef = this.fire.database.ref().child('/users');
    public auth = this.fire._firebaseAuthRef;



   grabUsersArray():Observable<any> {
         return Observable.create(obs => {
            
                this.customersRef.on('child_added', customer => {
                        const newCustomer = customer.val() as Customers;
                        newCustomer.id = customer.key;
                            obs.next(newCustomer);
                            console.log("juice");
                            
                },
                err => {
                    obs.throw(err);
                }
            );
        });
    }

   changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.customersRef.on('child_changed', upDatedCustomer => {
                const updatedUserDetails = upDatedCustomer.val() as Customers;
                updatedUserDetails.id = upDatedCustomer.key;
                obs.next(updatedUserDetails);
            },
            err => {
                obs.throw(err);
            });
        });
    }

      addUser(customer: Customers) {
        const newBugRef = this.customersRef.push();
        newBugRef.set({
                id: customer.id ,
                name: customer.name,
                email: customer.email,
                expenditure:customer.expenditure,
                credit: customer.credit,
                hasApp: customer.hasApp,
                notes: customer.notes,
                bookingsPaid: customer.bookingsPaid,
                phoneNumber: customer.phoneNumber,
                bookingsMissed: customer.bookingsMissed
        })
        .catch(err => console.error("Unable to add bug to Firebase - ", err));
    }


 updateBug(user: Customers) {
        const currentBugRef = this.customersRef.child(user.id);
        console.log(user.id);
        user.id = null;
        currentBugRef.update(user);
    }

getMissedBookings(user?: Customers){
    // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")

     return Observable.create(obs => {
            
                this.customersRef.child(user.id).child("bookingsMissed").on('child_added', customer => {
                        const newBooking= customer.val() as Bookings;
                        newBooking.id = customer.key;
                            obs.next(newBooking);
                           
                            
                },
                
                err => {
                    obs.throw(err);
                }
            );
        });

        

}

getMissedBookingsCashOut(userId?: string){
    // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")

     return Observable.create(obs => {
            
                this.customersRef.child(userId).child("bookingsMissed").on('child_added', customer => {
                        const newBooking= customer.val() as Bookings;
                        newBooking.id = customer.key;
                            obs.next(newBooking);
                           
                            
                },
                
                err => {
                    obs.throw(err);
                }
            );
        });

        

}

getPaidBookings(user: Customers){


     return Observable.create(obs => {
            
                this.customersRef.child(user.id).child("bookingsPaid").on('child_added', customer => {
                        const newBooking= customer.val() as Bookings;
                        newBooking.id = customer.key;
                            obs.next(newBooking);
                           
                            
                },
                
                err => {
                    obs.throw(err);
                }
            );
        });

}

getPaidBookingsCashOut(userId: string){


     return Observable.create(obs => {
            
                this.customersRef.child(userId).child("bookingsPaid").on('child_added', customer => {
                        const newBooking= customer.val() as Bookings;
                        newBooking.id = customer.key;
                            obs.next(newBooking);
                           
                            
                },
                
                err => {
                    obs.throw(err);
                }
            );
        });

}





















//    makeBooking(barber: string, date: string, time: string /*, bookedBy: string*/){
    
//     // this.customersRef.child(bookedBy)


//     // NEED TO USE ABOVE REF TO GRAB USERS NAME TO PASS IT INTO BOOKEDBY KEY IN DATABASE
       

//         var timeNodeData = {
//             booked: "booked",
//             bookedBy: "User"
//   };

//   this.barbersDBRef.child(barber).child("dates").child(date).child("times").child(String(time)).update(timeNodeData);

//    }
 
//     getSignUpDetails(email: string, password: string){
//            this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//             var errorCode = error;
//             var errorMessage1 = error.message;
//              console.log(errorMessage1);
             
//   // ...
//             });
//     }

//     getLoginDetails(email: string, password: string){
//         this.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//         var errorCode = error;
//           var errorMessage1 = error.message;
//          console.log(errorMessage1);
//         //  this.errorMessage = errorMessage1;
//   // ...
// });
//     }
   
    // getAddedBugs(): Observable<any> {
    //     return Observable.create(obs => {
            
    //             this.bookingsDbRef.on('child_added', booking => {
    //                     const newBooking = booking.val() as ModelBookingService;
    //                     newBooking.id = booking.key;
    //                         obs.next(newBooking);
                            
    //             },
    //             err => {
    //                 obs.throw(err);
    //             }
    //         );
    //     });
    // }

    // grabBarbersArray(bookingSelected: ModelBookingService):Observable<any> {
    //     const currentBookingRef = this.bookingsDbRef.child(bookingSelected.id).child('barbers');

    //      return Observable.create(obs => {
    //          currentBookingRef.on('child_added', booking => {
    //                     obs.next(booking.val());
                        
    //             },
    //             err => {
    //                 obs.throw(err);
    //             }
    //         );
    //     });
    // }

    // grabDatesArray(barberSelected: string):Observable<any> {
    //     const currentBookingRef = this.barbersDBRef.child(barberSelected).child('dates');

    //     return Observable.create(obs => {

    //         currentBookingRef.on('child_added', booking => {
    //             const newBooking = booking.val() as ModelBookingDates;
    //             newBooking.id = Number(booking.key);
    //             var currentEpochDate = (new Date).getTime();
    //             if (newBooking.id > currentEpochDate && newBooking.booked == "notBooked") {
    //                 obs.next(newBooking);
    //                 console.log(newBooking);
    //             } else {
    //                 console.log("date gone");
    //             }
                
                
    //         },
    //             err => {
    //                 obs.throw(err);
    //             }
            
    //         );
    //     });
    // }

    // grabTimesArray(barberSelected: string, dateSelected: string):Observable<any> {
    //     const currentBookingRef = this.barbersDBRef.child(barberSelected).child('dates').child(dateSelected).child('times');

    //     return Observable.create(obs => {

    //         currentBookingRef.on('child_added', booking => {
    //             const newBooking = booking.val() as ModelBookingTimes;
    //             newBooking.id = Number(booking.key);
                
    //             if (newBooking.booked == "notBooked"){
    //                 obs.next(newBooking);
    //                 console.log(newBooking);
    //             } else {
                    
    //             }
                
    //         },
    //             err => {
    //                 obs.throw(err);
    //             }
                
    //         );
    //     });

    // }

}