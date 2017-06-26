import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes,ChangeDetectorRef } from '@angular/core';

import { RosterService } from './service/roster.service';

import { RosterDates } from './model/rosterDates';

import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'roster-cmp',
    templateUrl: 'roster.component.html',
    styleUrls: ['roster.component.css'],
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

export class RosterComponent implements OnInit {

     events: any[] = [];

     array: [any];
    
    header: any;
    
    event: any;
    
    dialogVisible: boolean = false;
    
    idGen: number = 100;

    private date = new Date().toDateString();
    

    constructor(private rosterService: RosterService, private cd: ChangeDetectorRef) { }

    ngOnInit() {

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        document.getElementById('title')

        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        this.date = year+ "-" + month + "-" + day;

        console.log(this.date);

        this.header = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
        this.getUser();
        // this.getUser();
            // {
            //     "title": "All Day Event",
            //     "start": "2017-22-05"
            // },
            // {
            //     "title": "Paul Mercer",
            //     "start": "2017-05-24",
            //     "end": "2017-05-27"
            // },
            // {
            //     "title": "Repeating Event",
            //     "start": "2017-05-09T16:00:00"
            // },
            // {
            //     "title": "Repeating Event",
            //     "start": "2017-05-16T16:00:00"
            // },
            // {
            //     "title": "Conference",
            //     "start": "2017-05-11",
            //     "end": "2017-05-13"
            // }
       
    }

    

    

    getUser(){
    // this.events = null
    this.rosterService.grabUsersArray()
        .subscribe(rosterDate => {
            console.log(rosterDate);
            
            this.events.push(rosterDate);

            

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }

      handleDayClick(event) {
        this.event = new RosterDates();
        this.event.start = event.date.format();
        // console.log(this.event.start);
        this.dialogVisible = true;
        
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }
    
    handleEventClick(e) {
        this.event = new RosterDates();
        this.event.title = e.calEvent.title;

        
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if(e.view.name === 'month') {
            start.stripTime();
        }
        
        if(end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        console.log(this.event);
        // console.log(this.event.start);
        // console.log(this.event.allDay);
        
        // console.log(this.event.title);
        // console.log(end._i);
    }
    
    saveEvent() {
        //update
        if(this.event.id) {
            let index: number = this.findEventIndexById(this.event.id);
            
            console.log(this.event.id);

            //  this.rosterService.rosterDatesRef.child(this.event.id).update({
            //     title: this.event.title,
            //     start: this.event.start, 
            //     end: this.event.end,
            //     id: randomUid
            // })


            if(index >= 0) {
                this.events[index] = this.event;

                
            }
        }
        //new
        else {
            this.event.id = this.idGen++;
            // this.events.push(this.event);
            var self = this;
            var randomUid = Math.random().toString(36).substring(7);
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            this.rosterService.rosterDatesRef.child(randomUid).update({
                title: this.event.title,
                start: this.event.start, 
                end: this.event.end,
                id: randomUid,
                backgroundColor: "#" + randomColor
            })
            console.log(this.event);
            this.event = null;
        }
        
        this.dialogVisible = false;
    }
    
    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if(index >= 0) {
            this.events.splice(index, 1);
            this.rosterService.rosterDatesRef.child(this.event.id).remove();
        }
        this.dialogVisible = false;
    }
    
    findEventIndexById(id: number) {
        let index = -1;
        for(let i = 0; i < this.events.length; i++) {
            if(id == this.events[i].id) {
                index = i;
                break;
            }
        }
        
        return index;
    }
}

    








  

 
