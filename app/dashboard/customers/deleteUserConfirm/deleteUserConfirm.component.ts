import { Component, OnInit, trigger,transition,style,animate,group,state } from '@angular/core';

import { CustomerService } from '../../customers/service/customers.service';
import { Customers } from '../../customers/model/customers';


@Component({
    moduleId: module.id,
    styleUrls: ['deleteUserConfirm.component.css'],
    selector: 'deleteUserConfirm',
    templateUrl: 'deleteUserConfirm.component.html',
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

export class DeleteUserConfirm implements OnInit {

    constructor(private customerService: CustomerService) { }

     private currentUser = new Customers(null, null, null, 0, 0, "No", null, [111111], null, [111111]);

    ngOnInit(){

    }

    deleteUser(user?: Customers){

         if (user) {
            this.currentUser = new Customers(
                user.id,
                user.name,
                user.email,
                user.expenditure,
                user.credit,
                user.hasApp,
                user.notes,
                user.bookingsPaid,
                user.phoneNumber,
                user.bookingsMissed
            );

        if (user.credit > 0) {
                alert("Cannot Delete User with Money in Account");
        } else {
            
            this.customerService.customersRef.child(user.id).remove();
        }
        
    }

}
}