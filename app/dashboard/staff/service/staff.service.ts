import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Staff } from '../model/staff';
import { Bookings } from '../../bookings/model/bookings/bookings';
import { Transaction } from '../../transaction/model/transaction';

import { FirebaseConfigService } from '../../../core/services/firebase-config.service';


@Injectable()
export class StaffService { 

// user: Observable<firebase.User>;
    email: string;
    password:string;
    errorMessage: string;

    constructor(private fire: FirebaseConfigService /*, public afAuth: AngularFireAuth*/) { 
        // this.user = afAuth.authState;
     
    }

    private bookingsDbRef = this.fire.database.ref().child('/services');
    public barbersDBRef = this.fire.database.ref().child('/barbers').child('/barbers');
    public staffRef = this.fire.database.ref().child('/staff');
    public auth = this.fire._firebaseAuthRef;
    


   grabUsersArray():Observable<any> {
         return Observable.create(obs => {
            
                this.staffRef.on('child_added', staff => {
                        const newStaff = staff.val() as Staff;
                        newStaff.id = staff.key;
                            obs.next(newStaff);
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
            this.staffRef.on('child_changed', upDatedStaff => {
                const updatedStaffDetails = upDatedStaff.val() as Staff;
                updatedStaffDetails.id = upDatedStaff.key;
                obs.next(updatedStaffDetails);
            },
            err => {
                obs.throw(err);
            });
        });
    }

    //   addUser(customer: Staff) {
    //     const newBugRef = this.staffRef.push();
    //     newBugRef.set({
    //             id: customer.id ,
    //             name: customer.name,
    //             email: customer.email,
    //             expenditure:customer.earnings,
    //             credit: customer.credit,
    //             hasApp: customer.hasApp,
    //             notes: customer.notes,
    //             bookingsPaid: customer.bookingsPaid,
    //             phoneNumber: customer.phoneNumber,
    //             bookingsMissed: customer.bookingsMissed
    //     })
    //     .catch(err => console.error("Unable to add bug to Firebase - ", err));
    // }


 updateBug(user: Staff) {
        const currentBugRef = this.staffRef.child(user.id);
        console.log(user.id);
        user.id = null;
        currentBugRef.update(user);
    }

// getMissedBookings(user: Staff){
//     // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")

//      return Observable.create(obs => {
            
//                 this.staffRef.child(user.id).child("bookingsMissed").on('child_added', customer => {
//                         const newBooking= customer.val() as Bookings;
//                         newBooking.id = customer.key;
//                             obs.next(newBooking);
                           
                            
//                 },
                
//                 err => {
//                     obs.throw(err);
//                 }
//             );
//         });

        

// }

getPaidBookings(user: Staff){


     return Observable.create(obs => {
            
                this.staffRef.child(user.id).child("transactions").on('child_added', customer => {
                        const newBooking= customer.val() as Transaction;
                        newBooking.id = Number(customer.key);
                            obs.next(newBooking);
                           
                            
                },
                
                err => {
                    obs.throw(err);
                }
            );
        });

}



}





