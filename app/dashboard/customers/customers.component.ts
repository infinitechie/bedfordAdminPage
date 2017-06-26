import { Component, OnInit, trigger,transition,style,animate,group,state } from '@angular/core';

import { CustomerService } from '../customers/service/customers.service';
import { Customers } from '../customers/model/customers';


@Component({
    moduleId: module.id,
    styleUrls: ['customers.component.css'],
    selector: 'customers-cmp',
    templateUrl: 'customers.component.html',
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

export class CustomersComponent implements OnInit {

    private users: Customers[]  = [];

    constructor(private customerService: CustomerService) { }

    ngOnInit(){
        this.getUser();
        this.getUpdatedUser();

 }


getUser(){
    this.users = []
    this.customerService.grabUsersArray()
        .subscribe(user => {
            console.log(user);
            this.users.push(user);
            console.log(this.users);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }





    getUpdatedUser() {
        this.customerService.changedListener()
            .subscribe(updatedUser => {
                const userIndex = this.users.map(index => index.id).indexOf(updatedUser['id']);
                this.users[userIndex] = updatedUser;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }
}

 