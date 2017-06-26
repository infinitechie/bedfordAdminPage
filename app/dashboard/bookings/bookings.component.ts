import {Component,Input, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { StaffService } from '../staff/service/staff.service';
import { BookingService } from '../bookings/service/bookings.service';
import { Staff } from '../staff/model/staff';
import { Bookings } from '../bookings/model/bookings/bookings';
import { Transaction } from '../transaction/model/transaction';

import { BookingSharedService } from './bookingSharedService';

// import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {CalendarModule} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'bookings-cmp',
    templateUrl: 'bookings.component.html',
    styleUrls: ['bookings.component.css'],
    animations: [
        trigger('cardtable1', [
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
        ]),
        trigger('cardtable2', [
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
                    animate('0.3s 0.25s ease-out')
                ])
        ])
    ]
})

export class BookingsComponent implements OnInit {

    public cashOutBooking: Transaction;

    private ctrl: string;
    private currentDate: string;
    private meanTimeDate: string;

    public date: Date;
    public costOfService = 0;

    private dateDisplayed = "";

        private nineAm: boolean;
        private nine30Am: boolean;
        private tenAm: boolean;
        private ten30am: boolean;
        private elevenAm: boolean;
        private eleven30am: boolean;
        private twelveAm: boolean;
        private twelve30pm: boolean;
        private onePm: boolean;
        private one30pm: boolean;
        private twoPm: boolean;
        private two30pm: boolean;
        private threePm: boolean;
        private three30pm: boolean;
        private fourPm: boolean;
        private four30pm: boolean;
        private fivePm: boolean;
        private five30pm: boolean;
        private sixPm:boolean;
        private now: boolean;

    private staffArray: Staff[]  = [];
    private bookingArray0900: Bookings[] = [];
    private bookingArray0930: Bookings[] = [];
    private bookingArray1000: Bookings[] = [];
    private bookingArray1030: Bookings[] = [];
    private bookingArray1100: Bookings[] = [];
    private bookingArray1130: Bookings[] = [];
    private bookingArray1200: Bookings[] = [];
    private bookingArray1230: Bookings[] = [];
    private bookingArray1300: Bookings[] = [];
    private bookingArray1330: Bookings[] = [];
    private bookingArray1400: Bookings[] = [];
    private bookingArray1430: Bookings[] = [];
    private bookingArray1500: Bookings[] = [];
    private bookingArray1530: Bookings[] = [];
    private bookingArray1600: Bookings[] = [];
    private bookingArray1630: Bookings[] = [];
    private bookingArray1700: Bookings[] = [];
    private bookingArray1730: Bookings[] = [];
    private bookingArray1800: Bookings[] = [];
    private bookingArray1830: Bookings[] = [];
    private bookingArray1900: Bookings[] = [];
    private bookingArray1930: Bookings[] = [];
    private bookingArray2000: Bookings[] = [];

    private costSelected: number;
    private serviceSelected: string;
    private emailSelected: string;
    private customerName: string;
    private customerId: string;
    private staffIndex: string;
    private dateSelectedToBePassed: string;

    private daySelected = "Today";
    

    constructor(private staffService: StaffService, private bookingSvc: BookingService, private sharedService: BookingSharedService) { 
    }

   

    onChange(changedDate: string){
        
        var myDate = new Date(changedDate);
        var parsedDate = myDate.toLocaleDateString();
        this.sharedService.setDate(parsedDate);
        this.getUser(parsedDate);

    }

    ngOnInit(){


    this.getTime()

        this.sharedService.costSelected.subscribe(message => this.costSelected = message);
        this.sharedService.dateSelectedMain.subscribe(message => this.dateSelectedToBePassed = message);

        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var date = year+ "-" + month + "-" + day;
        this.sharedService.setDate(date);
        this.dateDisplayed = day + "/" + month + "/" + year;
        this.getUser(date);
        this.getUpdatedUser();
        this.currentDate = date;
        this.meanTimeDate = date;


        console.log(this.currentDate);

    var tommorowsDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var tommorowsDay = tommorowsDate.getDate()
    var tommorowsMonth = tommorowsDate.getMonth() + 1
    var tommorowsYear = tommorowsDate.getFullYear()
    var tomorowDate = tommorowsDay + "-" + tommorowsMonth + "-" + tommorowsYear;
        
 }

tap(){
    console.log("jam");
        $('td').map(function(){
        var index = $(this).index();
        console.log(this.staffArray[index- 1]);
        var staffId = this.staffArray[index- 1].email
        console.log(staffId);
        });
}

 loggUser(booking: Bookings){
     

     if (booking.service != null && booking.id != null) {

     
     var youth = true;


     var self = this

    $('td').click(function(){
    var index = $(this).index();
    if (youth) {
        console.log(self.staffArray[index- 1]);
        var staffId = self.staffArray[index- 1].email
        console.log(staffId);
        youth = false;
        self.date = new Date();
        var usableDate = self.date.toDateString()

         self.bookingSvc.servicesDbRef.child(booking.service).once('value').then(function(snapshot) {
     var num = snapshot.val().cost as number;
    console.log(num);

     self.cashOutBooking = new Transaction(655656, usableDate, booking.customer, booking.service, booking.id, num, "Booking")
    console.log(self.cashOutBooking);
console.log("KKKKKKKKKKKKKKKK");
console.log(booking.customer);

    self.sharedService.setCost(num);
    self.sharedService.setCustomerId(booking.id);
    self.sharedService.setCustomerName(booking.customer);
    self.sharedService.setService(booking.service);
    // self.sharedService.setStaffIndex(staffId);
    self.sharedService.setEmail(staffId);

    console.log(self.costSelected);
    });

        
       


    } else{

    }
    

});
     } else {
         console.log("We gots no id");
     }

   

     console.log(booking);
 }


getServiceCost(service: string, cost: number){
    
    this.bookingSvc.servicesDbRef.child("Wash & Cut").once('value').then(function(snapshot) {
     var username = snapshot.val().cost;
    console.log(username);
    cost = username;
    
    });


}

getTime(){
    var hours =  new Date().getHours()
    var minutes = new Date().getMinutes()
    var percentageTime :number;
    var timeString = ""
    console.log(hours);
    console.log(minutes);
    if (minutes > 30) {
        percentageTime = 5
         timeString = String(hours) + "." + String(percentageTime);
        console.log(timeString);
    } else {
        percentageTime = 0
        timeString = String(hours)
        console.log(timeString);
    }

    if (timeString == "9") {
        this.nineAm = true
    } else if (timeString == "9.5") {
        this.nine30Am = true
    } else if (timeString == "10") {
        this.tenAm = true
    } else if (timeString == "10.5") {
        this.ten30am = true
    } else if (timeString == "11") {
        this.elevenAm = true
    } else if (timeString == "11.5") {
        this.eleven30am = true
    } else if (timeString == "12") {
        this.twelveAm = true
    } else if (timeString == "12.5") {
        this.twelve30pm = true
    } else if (timeString == "13") {
        this.onePm = true
    } else if (timeString == "13.5") {
        this.one30pm = true
    } else if (timeString == "14") {
        this.twoPm = true
    } else if (timeString == "14.5") {
        this.two30pm = true
    } else if (timeString == "15") {
        this.threePm = true
    } else if (timeString == "15.5") {
        this.three30pm = true
    } else if (timeString == "16") {
        this.fourPm = true
    } else if (timeString == "16.5") {
        this.four30pm = true
    } else if (timeString == "17") {
        this.fivePm = true
    } else {
       console.log("Not between working hours");
    }

        


    
}



setClass(booking: Bookings){
    let classes = {
        blue: booking.booked == "booked", 
        lightGreen: booking.booked == "paid",
        plain: booking.booked == "notBooked" || booking.booked == null,
        red : booking.booked == "missed"

    }
    return classes


}
        

getTomorrowBooking(){

    if (this.daySelected == "Yesterday") {

        var todaycurrentDate = new Date()
        var tday = todaycurrentDate.getDate()
        var tmonth = todaycurrentDate.getMonth() + 1
        var tyear = todaycurrentDate.getFullYear()
        var tdate = tyear+ "-" + tmonth + "-" + tday;
        this.dateDisplayed = tday + "/" + tmonth + "/" + tyear;
        this.daySelected = "Today";
        this.getUser(tdate);


    } else {
        var tommorowsDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var tommorowsDay = tommorowsDate.getDate()
        var tommorowsMonth = tommorowsDate.getMonth() + 1
        var tommorowsYear = tommorowsDate.getFullYear()
        var tomorowDate = tommorowsYear + "-" + tommorowsMonth + "-" + tommorowsDay;
        this.dateDisplayed = tommorowsDay + "/" + tommorowsMonth + "/" + tommorowsYear;
        this.daySelected = "Tomorrow";
        console.log(tomorowDate);
        this.getUser(tomorowDate);
    }
       
}

getYesterdayBooking(){
    
   if(this.daySelected == "Tomorrow") {

        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        var date = year+ "-" + month + "-" + day;
        this.dateDisplayed = day + "/" + month + "/" + year;
        this.daySelected = "Today";
        this.getUser(date);
        
   } else {
        var yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate()-1);
        var ydate = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth()+1) + '-' + yesterdayDate.getDate();
        this.dateDisplayed = yesterdayDate.getDate() + '/' + (yesterdayDate.getMonth()+1) + '/' + yesterdayDate.getFullYear();
        this.daySelected = "Yesterday";
        console.log(ydate);
        this.getUser(ydate);
   }
}



getUser(date: string){
    
    this.staffArray = []
     this.bookingArray0900 = [];
     this.bookingArray0930 = [];
     this.bookingArray1000 = [];
     this.bookingArray1030 = [];
     this.bookingArray1100 = [];
     this.bookingArray1130 = [];
     this.bookingArray1200 = [];
     this.bookingArray1230 = [];
     this.bookingArray1300 = [];
     this.bookingArray1330 = [];
     this.bookingArray1400 = [];
     this.bookingArray1430 = [];
     this.bookingArray1500 = [];
     this.bookingArray1530 = [];
     this.bookingArray1600 = [];
     this.bookingArray1630  = [];
     this.bookingArray1700  = [];
     this.bookingArray1730  = [];
     this.bookingArray1800  = [];
     this.bookingArray1830  = [];
     this.bookingArray1900  = [];
     this.bookingArray1930  = [];
     this.bookingArray2000  = [];
    this.staffService.grabUsersArray()
        .subscribe(staff => {
            // console.log(staff);
            this.staffArray.push(staff);
            this.getBookingsFromSvc0900(staff, date);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }


getBookingsFromSvc0900(staff: Staff, date: string){
    this.bookingSvc.getBookings(staff, date)
        .subscribe(booking => {
            // console.log(booking.time);
            if (booking.time == "9:00am") {
                this.bookingArray0900.push(booking);
            } else if (booking.time == "9:30am") {
                this.bookingArray0930.push(booking);
            } else if (booking.time == "10:00am") {
                this.bookingArray1000.push(booking);
            } else if (booking.time == "10:30am") {
                this.bookingArray1030.push(booking);
            } else if (booking.time == "11:00am") {
                this.bookingArray1100.push(booking);
            } else if (booking.time == "11:30am") {
                this.bookingArray1130.push(booking);
            } else if (booking.time == "12:00pm") {
                this.bookingArray1200.push(booking);
            } else if (booking.time == "12:30pm") {
                this.bookingArray1230.push(booking);
            } else if (booking.time == "12:30pm") {
                this.bookingArray1230.push(booking);
            } else if (booking.time == "13:00pm") {
                this.bookingArray1300.push(booking);
            } else if (booking.time == "13:30pm") {
                this.bookingArray1330.push(booking);
            } else if (booking.time == "14:00pm") {
                this.bookingArray1400.push(booking);
            } else if (booking.time == "14:30pm") {
                this.bookingArray1430.push(booking);
            } else if (booking.time == "15:00pm") {
                this.bookingArray1500.push(booking);
            } else if (booking.time == "15:30pm") {
                this.bookingArray1530.push(booking);
            } else if (booking.time == "16:00pm") {
                this.bookingArray1600.push(booking);
            } else if (booking.time == "16:30pm") {
                this.bookingArray1630.push(booking);
            } else if (booking.time == "17:00pm") {
                this.bookingArray1700.push(booking);
            } else if (booking.time == "17:30pm") {
                this.bookingArray1730.push(booking);
            } else if (booking.time == "18:00pm") {
                this.bookingArray1800.push(booking);
            } else if (booking.time == "18:30pm") {
                this.bookingArray1830.push(booking);
            } else if (booking.time == "19:00pm") {
                this.bookingArray1900.push(booking);
            } else if (booking.time == "19:30pm") {
                this.bookingArray1930.push(booking);
            } else if (booking.time == "20:00pm") {
                this.bookingArray2000.push(booking);
            } 
            
        }

        )

}




    getUpdatedUser() {
        this.staffService.changedListener()
            .subscribe(updatedUser => {
                const userIndex = this.staffArray.map(index => index.id).indexOf(updatedUser['id']);
                this.staffArray[userIndex] = updatedUser;
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }

    getUserNow(){
        console.log("fsfffddfdfdf");
    }
}

 
