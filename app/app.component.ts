import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SharedSidebarService } from './authGuard/service/sharedSidebarService';
import { AuthenticationService } from './dashboard/authentication/service/authentication.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit{
    location: Location;
    private signedIn: string;
    constructor(location:Location, private sidebarSvc: SharedSidebarService, private authService: AuthenticationService) {
        this.location = location;
    }
    ngOnInit(){
        $.getScript('../assets/js/light-bootstrap-dashboard.js');

        this.sidebarSvc.signedIn.subscribe(message => this.signedIn = message);
        // var d = new Date();
        // d.getHours();

        // console.log(d.getHours()* 100);
    }
    public isMaps(path){
        var title = this.location.prepareExternalUrl(this.location.path());
        title = title.slice( 1 );
        if(path === title){
            return true;
        }
        else {
            return false;
        }
    }
}
