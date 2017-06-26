import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Upload } from '../model/upload';
// import { Bookings } from '../../bookings/model/bookings/bookings';

import { FirebaseConfigService } from '../../../core/services/firebase-config.service';


@Injectable()
export class UploadImageService {

  constructor(private fire: FirebaseConfigService) { }

  public databaseRef = this.fire._database.ref()
  // public databasePortfolioRef = this.fire.database.ref()
//   public storageLocation = '/stock'
  private uploadTask = this.fire.storageUploadTask;
//   private taskChange = this.fire.storageTask;
//   uploads: FirebaseListObservable;

  pushUpload(upload: Upload, staffId: string, storageLocation: string) {
    let storageRef = this.fire.storage.ref();
    this.uploadTask = storageRef.child(`${upload.file.name}`).put(upload.file);

    this.uploadTask.on('state_changed',
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileDataStock(upload, staffId, storageLocation);
      }
    );
  }


  uploadPortfolio(upload: Upload, storageLocation: string) {
    let storageRef = this.fire.storage.ref();
    this.uploadTask = storageRef.child(`${upload.file.name}`).put(upload.file);

    this.uploadTask.on('state_changed',
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.savePortfolioImage(upload, storageLocation);
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileDataStock(upload: Upload, staff: string, storageLocation:string) {
    // this.db.list(`${this.basePath}/`).push(upload);
    
    this.databaseRef.child(storageLocation).child(staff).update({
        imageUrl: upload.name
    })
  }

   // Writes the file details to the realtime db
  private savePortfolioImage(upload: Upload, storageLocation:string) {
    // this.db.list(`${this.basePath}/`).push(upload);
    var ranomUid = Math.random().toString(36).substring(7);
    this.databaseRef.child(storageLocation).child(ranomUid).update({
        imageUrl: upload.name
    })
  }

 


}