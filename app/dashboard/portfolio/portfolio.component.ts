declare var google: any;
import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { Portfolio } from '../portfolio/model/portfolio';
import { PortfolioService } from '../portfolio/service/portfolio.service';


import { UploadImageService } from '../uploadImages/service/uploadImages.service';
import { Upload } from '../uploadImages/model/upload';
import * as _ from "lodash";

@Component({
    moduleId: module.id,
    selector: 'portfolio-cmp',
    styleUrls: ['portfolio.components.css'],
    templateUrl: 'portfolio.component.html',
    
})

export class PortfolioComponent implements AfterViewInit {



     private portfolioArray: Portfolio[]  = [];

       public imageSrc: string;

       private imageArray: String[] = [];

        selectedFiles: FileList;
        currentUpload: Upload;

    constructor(private portfolioService: PortfolioService, private upSvc: UploadImageService) { }

    ngAfterViewInit(){
        this.getStock();
        this.getUpdatedUser();
        // this.getUpdatedUser();
         

 }


getStock(){
    this.portfolioArray = []
    
    this.portfolioService.grabStockArray()
        .subscribe(image => {
            console.log(image);
            // this.setImage(stock);
            // this.imageSrc = null;
            this.grabImageUrl(image);
            this.portfolioArray.push(image);
            // this.imageArray.push(stock.imageUrl);

            console.log(this.portfolioArray);

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }

    resizeImage(file:File, maxWidth:number, maxHeight:number):Promise<Blob> {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            let width = image.width;
            let height = image.height;
            
            if (width <= maxWidth && height <= maxHeight) {
                resolve(file);
            }

            let newWidth;
            let newHeight;

            if (width > height) {
                newHeight = height * (maxWidth / width);
                newWidth = maxWidth;
            } else {
                newWidth = width * (maxHeight / height);
                newHeight = maxHeight;
            }

            let canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            let context = canvas.getContext('2d');

            context.drawImage(image, 0, 0, newWidth, newHeight);

            canvas.toBlob(resolve, file.type);
        };
        image.onerror = reject;
    });
}
    
grabImageUrl(currentImage: Portfolio){


    this.portfolioService.stockStorageRef.child(currentImage.imageUrl).getDownloadURL().then(url => 
    
    // console.log(url)
    currentImage.imageStorageRef = url
    
    
        
    ).catch(function(error) {
// Handle any errors
console.log(error);
});


    }

detectFiles(event) {

    this.selectedFiles = event.target.files;
  }

  uploadSingle(currentImage?: Portfolio) {
      
    let file = this.selectedFiles.item(0);
    this.resizeImage(file, 200, 200);

    this.currentUpload = new Upload(file);
    this.upSvc.uploadPortfolio(this.currentUpload, "portfolio");
    // window.location.reload();
      
  }

   updateBug(newImage?: Portfolio) {
       if (newImage) {
        const currentBugRef = this.portfolioService.portfolioRef.child(newImage.id);
        console.log(newImage.id);

        let file = this.selectedFiles.item(0)
        this.currentUpload = new Upload(file);
        this.upSvc.pushUpload(this.currentUpload,newImage.id, "portfolio");



        // newImage.id = null;
        // currentBugRef.update(newImage);
       } else {
           console.log("No crash bigash");
       }
        
        
    }

    getUpdatedUser() {
        this.portfolioService.changedListener()
            .subscribe(updatedUser => {
                const userIndex = this.portfolioArray.map(index => index.id).indexOf(updatedUser['id']);
                this.portfolioArray[userIndex] = updatedUser;
                
            },
            err => {
                console.error("Unable to get updated bug - ", err);
            });
    }


 }



    

