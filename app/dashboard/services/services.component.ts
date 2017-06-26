import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes,ChangeDetectorRef } from '@angular/core';

// import { RosterService } from './service/roster.service';

// import { RosterDates } from './model/rosterDates';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AddServiceService } from './service/services.service';

import { ServiceCost } from '../bookings/model/bookings/bookings';
import { Staff } from '../staff/model/staff';
import { StaffService } from '../staff/service/staff.service';

import { Observable } from 'rxjs/Observable';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'services-cmp',
    templateUrl: 'services.component.html',
    styleUrls: ['services.component.css'],
    animations: [
        trigger('cardnotifications', [
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

export class ServicesComponent implements OnInit {

    private servicesForm: FormGroup;
    private serviceArray: ServiceCost[] = [];
    private staffArray: Staff[] = [];
    private staffSelected: Staff[]= [];


    private staffIds: string[]=[];
    private currentService = new ServiceCost(null, null, null, null);
    
    service = "nope";
    deals = "nope";

    cities: SelectItem[];

    selectedCity: string;

    selectedCities: string[];

    allSelected: boolean;


    constructor(private formB: FormBuilder, private addService: AddServiceService, private StaffService: StaffService) { }

    ngOnInit(){
        this.allSelected = false;
        this.service = "unClicked";
        this.deals = "unClicked";


        // this.dddstaffIds
        // this.cities = [];
        // this.cities.push({label:'New York', value:'New York'});
        // this.cities.push({label:'Rome', value:'Rome'});
        // this.cities.push({label:'London', value:'London'});
        // this.cities.push({label:'Istanbul', value:'Istanbul'});
        // this.cities.push({label:'Paris', value:'Paris'});

        this.getStaff();
        this.getServices();
         this.servicesForm = this.formB.group({

           addService: ["Hair Chop"],
           addDeal: ["One day Deal"],
           addServiceDescription: ["Description for Service"],
           addDealDescription: ["Description"],
           serviceCost: ["€12"],
           dealCost: ["€14"]
            // ,
            // bookingTime: [this.bookingTime]
            
        });

    }

    cancelButton(){
        this.service = "unClicked";
        this.deals = "unClicked";

    }

    setDealsClicked(){
        this.deals = "yes"
        this.service = "clicked"
    }

    setServiceClicked(){
        this.service = "yes"
        this.deals = "clicked"
    }

    selectedAllUsers(){
        if (this.allSelected == true) {
                this.allSelected = false;
                this.staffSelected = [];
                
        } else {
            this.allSelected = true
            this.staffSelected = this.staffArray;
            console.log(this.staffSelected);

        }
        
    }

//     currentCompany;

//     selectCompany(event: any, item: any) {
//         this.currentCompany = "highlighted";

//   }
selectedTrue: boolean;

private dict = [] 

addToArray(staff?: Staff){
    this.selectedTrue = true;
    if (staff) {
        var tapped =+ 1;
        this.staffIds.push(staff.id);
        this.dict.push(staff.id)
        // var dict = []; // create an empty array
        this.staffSelected.indexOf(staff) === -1 ? this.staffSelected.push(staff) && this.changeToHighlighted(staff) : console.log("This item already exists") && this.changeToHighlighted(staff);
    console.log(this.dict);
    

    } else {
        console.log("staff not entered");
    }
    
}

changeToHighlighted(staff?: Staff){
    if (staff) {
        if (staff.highlighted == true) {
            staff.highlighted = false;
        } else if (staff.highlighted == false) {
            staff.highlighted = true;
        } else {
            console.log("staff is null")
        }
        
    } else {
        
    }
}

private staffNames: string[]= [];

    setStaff(service: ServiceCost){
        
             console.log(this.staffSelected);
        var self = this;
         this.addService.servicesDbRef.child(service.name).update({

            name: service.name,
            cost: service.cost,
            description: service.description,
            barbers:  this.dict,
            deal: service.deal
            
            
        })

        
        .catch(err => console.error("Unable to add Transaction to Firebase - ", err));
    }

    getStaff(){
        this.addService.grabUsersArray()
        .subscribe(staff => {
            // console.log(staff);
            staff.highlighted = false;
            this.staffNames.push(staff.name);
            
            this.staffArray.push(staff);
            


            console.log(this.staffNames);

        },
        err => {
            console.error("unable to add bug -", err);
        });

    }

    submit(){
       

        if (this.service == "yes"){
        this.currentService.name = this.servicesForm.value["addService"];
        this.currentService.description = this.servicesForm.value["addServiceDescription"];
        this.currentService.cost = Number(this.servicesForm.value["serviceCost"]);
        this.currentService.barbers = this.staffIds;
        this.setStaff(this.currentService)


    } else if(this.deals == "yes") {
       
        this.currentService.name = this.servicesForm.value["addDeal"];
        this.currentService.description = this.servicesForm.value["addDealDescription"];
        this.currentService.cost = Number(this.servicesForm.value["dealCost"]);
        this.currentService.deal = "Yes";
        this.currentService.barbers = this.staffIds;
        this.setStaff(this.currentService)
        
        } else {
            console.log("somethings wrong");
        }

        



    }



    // setBarbersNames(array: string[]){
    //     // console.log(array);
        
    //     console.log("SSDDSSDSDSDSDDS")
    //     var self = this;
    //     for (var a of array) {
    //         this.StaffService.staffRef.child(a).once('value').then(function(snapshot) {
    //     var num = snapshot.val().name as string;
    //     // console.log(num);
        
    //     self.arr.push(num);
        
    //     console.log(self.arr)
    // });
    
    
    
    //     }
    //     // console.log(this.arr);
    //     // return this.arr
        
        
    // }

    getServices(){
        var self = this;
         this.addService.getServiceCost()
        .subscribe(service => {
            // self.arr = [];
            // console.log(service);
            // console.log(service.barbers);
            // self.setBarbersNames(service.barbers);
            console.log("DDDDDDDD")
            // service.barbers = self.arr;
            
            // console.log(service.barbers);
            // console.log(service.barbers);
            
            self.serviceArray.push(service);
            // service.barbers = [];

            
           

        },
        err => {
            console.error("unable to add bug -", err);
        });
        
    }
    

}

    








  

 
