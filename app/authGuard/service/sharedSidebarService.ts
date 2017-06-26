import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../dashboard/authentication/service/authentication.service';

@Injectable()
export class SharedSidebarService  {

    private UserSignedInMain = new BehaviorSubject<string>('notLoggedIn');
    signedIn = this.UserSignedInMain.asObservable();

    private currentUser = new BehaviorSubject<boolean>(false);
    isThereACurrentUser = this.currentUser.asObservable();
    
    constructor(private AuthenticationService: AuthenticationService) {
        
    }

    

    setUserLoggedIn(UID: string){
        this.UserSignedInMain.next(UID);
    }


    signUserIn(){
        var self = this;
      this.AuthenticationService.staffSignedIn.child("signedIn").child("user").once('value').then(function(snapshot) {
        var num = snapshot.val() as boolean;
        console.log(num);
        self.setCurrentUser(true);
        
  });
  

}

   

    setCurrentUser(user: boolean){
        this.currentUser.next(user);
    }
   

}