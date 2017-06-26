import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Staff } from '../../staff/model/staff';
import { Bookings } from '../../bookings/model/bookings/bookings';
import { ServiceCost } from '../../bookings/model/bookings/bookings';


import { FirebaseConfigService } from '../../../core/services/firebase-config.service';


@Injectable()
export class AddServiceService { 

// user: Observable<firebase.User>;
    email: string;
    password:string;
    errorMessage: string;

    constructor(private fire: FirebaseConfigService /*, public afAuth: AngularFireAuth*/) { 
        // this.user = afAuth.authState;
     
    }

    public servicesDbRef = this.fire.database.ref().child('/services');
    public customersDbRef = this.fire.database.ref().child('/users');
    public barbersDBRef = this.fire.database.ref().child('/barbers').child('/barbers');
    public staffRef = this.fire.database.ref().child('/staff');
    public auth = this.fire._firebaseAuthRef;



//   addUser(transaction: Transaction) {
//         this.transactionsRef.child(String(transaction.id)).set({
//                 id: transaction.id,
//                 name: transaction.name,
//                 cost: transaction.cost,
//                 date: transaction.date,
//                 customerId: transaction.customerId,
//                 customer: transaction.customer,
//                 serviceType: transaction.serviceType
//         })
//         .catch(err => console.error("Unable to add Transaction to Firebase - ", err));
//     }

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

    //   addBooking(customer: Staff) {
    //     const newBugRef = this.staffRef.push();
    //     newBugRef.set({
                
    //     })
    //     .catch(err => console.error("Unable to add bug to Firebase - ", err));
    // }


 updateBooking(staffMember: string,date:string,time:string, customerName: string, serviceSelected: string, customerEmail: string, paid: string) {
        const bookingRef = this.staffRef.child(staffMember).child("dates").child(date).child("times").child(time);
        // console.log(user.id);
        // user.id = null;
        bookingRef.set({
            booked: paid,
            customer: customerName,
            service: serviceSelected,
            id: customerEmail,
            time: "10:30am"
        });
    }

getServiceCost():Observable<any> {

    return Observable.create(obs => {
        this.servicesDbRef.on('child_added', serviceCost => {
            const newService = serviceCost.val() as ServiceCost;
            newService.name = serviceCost.key;
                obs.next(newService);
                // console.log(newService);
        })
    })
}



getBookings(user: Staff, date: string){
    // var bookingsRef = this.customersRef.child(user.id).child("bookingsMissed")

     return Observable.create(obs => {
            
                this.staffRef.child(user.id).child("dates").child(date).child("times").on('child_added', customer => {
                        const newBooking = customer.val() as Bookings;
                        newBooking.key = customer.key;
                            obs.next(newBooking);
                           
                            
                },
                
                err => {
                    obs.throw(err);
                }
            );
        });

}

}