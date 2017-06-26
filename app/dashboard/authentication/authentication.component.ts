import {Component,Input, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { StaffService } from '../staff/service/staff.service';
import { BookingService } from '../bookings/service/bookings.service';
import { Staff } from '../staff/model/staff';
import { Portfolio } from '../portfolio/model/portfolio';
import { UploadImageService } from '../uploadImages/service/uploadImages.service';
import { Transaction } from '../transaction/model/transaction';
import { SharedSidebarService } from '../../authGuard/service/sharedSidebarService';

import { Upload } from '../uploadImages/model/upload';
import * as _ from "lodash";


@Component({
    moduleId: module.id,
    selector: 'authentication-cmp',
    templateUrl: 'authentication.component.html',
    styleUrls: ['authentication.component.css'],
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

export class AuthenticationComponent implements OnInit {

    private signUpForm: FormGroup;
        selectedFiles: FileList;
        currentUpload: Upload;
 
    constructor(private sharedSvc: SharedSidebarService ,private route: ActivatedRoute, private router: Router, private staffService: StaffService, private bookingSvc: BookingService, private formB: FormBuilder, private uploadSvc: UploadImageService) { 
    }

   

   
    ngOnInit(){  

        // this.setUserSignedOut();
        this.signUserIn();
        this.sharedSvc.signUserIn();
        // this.grabCurrentUser();
        console.log(this.staffService.auth.currentUser);
        this.signUpForm = this.formB.group({
        name: [],
        email: [],
        phoneNumber: [],
        password: [],
        companyCode: []



    });

}

// grabCurrentUser(){
//     console.log(this.staffService.auth.currentUser);
    
// }

detectFiles(event) {

    this.selectedFiles = event.target.files;
  }

  signUserIn(){
      this.bookingSvc.staffSignedIn.child("signedIn").child("user").once('value').then(function(snapshot) {
        var num = snapshot.val() as boolean;
        console.log(num);
  });

}

setUserSignedIn(){
    this.bookingSvc.staffSignedIn.child("signedIn").set({
        user: true
    });
}

setUserSignedOut(){
     this.bookingSvc.staffSignedIn.child("signedIn").set({
        user: false
    });
}



  uploadSingle(currentImage?: Portfolio) {
      
    let file = this.selectedFiles.item(0);
    // this.resizeImage(file, 200, 200);

    this.currentUpload = new Upload(file);
    this.uploadSvc.uploadPortfolio(this.currentUpload, "portfolio");
    // window.location.reload();
      
  }
private returnUrl : string;
  registerButton(){
      var self = this;
      this.returnUrl = this.route.snapshot.queryParams['dashboard'] || '';
      this.staffService.auth.createUserWithEmailAndPassword(this.signUpForm.value["email"], this.signUpForm.value["password"])
        
        .then(function(firebaseUser) {
       // Success 
            // self._sharedService.setEmail(email);
            // alert("successfully signed up ");
            // self._sharedService.passData("stripe");
            console.log("JJJJJJJJJJJ");
            self.staffService.auth.signInWithEmailAndPassword(self.signUpForm.value["email"], self.signUpForm.value["password"]);
            console.log(self.staffService.auth.currentUser);
            self.setUserSignedIn();
            self.sharedSvc.setUserLoggedIn("loggedIn");
            self.router.navigate(['/dashboard']);
            // self.sharedSvc.setCurrentUser(true);
            
            // self.writeUserData(Math.random().toString(36).slice(2),email);
            
            // self.openCheckout();
            
            
   })


           .catch(function(error) {
       // Error Handling
            var errorMessage1 = error.message;
            alert(errorMessage1);
            
            
  });
  }


}

 
