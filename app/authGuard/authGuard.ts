import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/take';
import {FirebaseConfigService} from "../core/services/firebase-config.service";
import { SharedSidebarService } from "./service/sharedSidebarService";
import {BookingService} from "../dashboard/bookings/service/bookings.service";


@Injectable()
export class AuthGuard implements CanActivate {
    private currentUser:boolean;
    constructor(private authService:FirebaseConfigService, private router:Router, private sharedSvc: SharedSidebarService, private bookingSvc: BookingService){}

    
    // canActivate(){
    //     if(this.authService.getUserLoggedIn()){
    //         this.router.navigateByUrl('authentication')
    //         return false;
    //     } else {
            
    //         return true;
    //     }

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
private userLoggedIn :boolean;
getUserLoggedIn():boolean{
    this.userLoggedIn= true;
       var val: boolean;
       var self = this;
       var callback;
       this.authService.auth.onAuthStateChanged( function(user) {
           
  if (user) {
      self.userLoggedIn = true;
      console.log("POIUN^TY");
      console.log(self.userLoggedIn);
    //   self.router.navigate(['/dashboard']);
    console.log(user);
  } else {
      console.log("No one signed Ihhhhn");
      console.log(self.userLoggedIn);
      self.router.navigate(['/authentication']);
      self.userLoggedIn = false;
    console.log("No one signed In");
  }
});


//  this.authService.auth.onAuthStateChanged(address, function(location){
//   console.log(location); // this is where you get the return value
// });
console.log(self.userLoggedIn);
console.log("Some one signed In");
return self.userLoggedIn;

   }


// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.authService.auth.currentUser.map((currentUser) => {
//         if (!currentUser) {
//           this.router.navigateByUrl('login');
//           return false;
//         }
//         return true;
//     }).take(1);

//      signUserIn(){
//       this.bookingSvc.staffSignedIn.child("signedIn").once('value').then(function(snapshot) {
//         this.currentUser = snapshot.val() as boolean;
//         console.log(currentUser);
//   });

//   }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
            
            // this.authService.getUserLoggedIn();
            // var str = this.authService.getUserLoggedIn();
            // console.log(str);


            console.log("this.getUserLoggedIn())");
            console.log(this.getUserLoggedIn());
            return this.getUserLoggedIn();
            // return true










                // if(this.noReturnedUser()){
                //     console.log("LLLLL")
                //     return true
                // } else if (this.returnedUser()){
                //     return false
                // }


                

                
            

         }

        returnedUser(): boolean{
            var self = this;
               this.authService.auth.onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    self.router.navigate(['/dashboard']);
                    return 
                }  

                
                });
                return true

         }

          noReturnedUser(): boolean{
              var self = this;
               this.authService.auth.onAuthStateChanged(function(user) {
                if (!user) {
                    //User is not signed In
                   
                                alert("Please Login");
                                console.log("KKKDKDKDKDKDDK");
                                self.router.navigate(['/authentication']);
                                return
                }  
                });
                return true

         }

        

}


            

        

