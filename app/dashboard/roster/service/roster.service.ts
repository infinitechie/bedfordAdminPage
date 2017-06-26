import {Injectable} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { RosterDates } from '../model/rosterDates';


import { FirebaseConfigService } from '../../../core/services/firebase-config.service';



@Injectable()
export class RosterService {
    
    constructor(private fire: FirebaseConfigService) { }

    public rosterDatesRef = this.fire.database.ref().child('/rosterDates');

  grabUsersArray():Observable<any> {
         
         return Observable.create(obs => {
            
                this.rosterDatesRef.on('child_added', rosterDate => {
                    
                        var dates = rosterDate.val() as RosterDates;
                        // dates.id = rosterDate.val().key
                            var arrayOfDicts = {"title": dates.title, "start": dates.start, "end": dates.end, "id":dates.id, "backgroundColor" : dates.backgroundColor};

                            
                            
                            obs.next(arrayOfDicts);
                            

                },
                err => {
                    obs.throw(err);
                }
            );
        });
    }
  
}
