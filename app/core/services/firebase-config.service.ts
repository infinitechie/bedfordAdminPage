import { Injectable } from '@angular/core';

import *  as firebase from 'firebase';
require('firebase/database');
require('firebase/auth');
require('firebase/storage')

import  { FIREBASE_CONFIG } from '../constants/constants';

@Injectable()
export class FirebaseConfigService {


    public _database: firebase.database.Database;
    public _firebaseAuthRef : firebase.auth.Auth;
    public storage: firebase.storage.Storage;
    public storageUploadTask: firebase.storage.UploadTask;
    public storageTask : firebase.storage.TaskEvent;
    
    


    constructor() {
        this.configureApp();
        this.configureDatabase();
        this.configureAuth();
        this.configureStorage();
        // this.getUserLoggedIn();
    }

 
   
   getUserLoggedIn():boolean{
    
       var val: boolean;
       this._firebaseAuthRef.onAuthStateChanged(function(user) {
  if (user) {
      val = true;
    console.log(user);
  } else {
      val = true
    console.log("No one signed In");
  }
});
return val

   }

// if (user) {
//     console.log("USERCREATED");
//   console.log(user);
//   return true
// } else {
//   console.log("No User Signed In");
//   return false
// }
//    }
    
//Data encapsulation (getters and setters)
    public get database() {
        return this._database;
    }

    public get auth() {
        return this._firebaseAuthRef;
    }

    configureApp() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    configureDatabase() {
        this._database = firebase.database();
    }

    configureAuth() {
        this._firebaseAuthRef = firebase.auth();
    }

    configureStorage(){
        this.storage = firebase.storage();
    }

}