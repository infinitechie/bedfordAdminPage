import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';

import { StockService } from '../stock/service/stock.service';

import { Stock } from '../stock/model/stock';
import { Transaction } from '../transaction/model/transaction';

import { TransactionService } from '../transaction/service/transaction.service';


import { UploadImageService } from '../uploadImages/service/uploadImages.service';
import { Upload } from '../uploadImages/model/upload';
import * as _ from "lodash";


@Component({
    moduleId: module.id,
    selector: 'stock-cmp',
    styleUrls: ['stock.component.css'],
    templateUrl: 'stock.component.html',
    animations: [
        trigger('cardtypography', [
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                    animate('0.3s 0s ease-out', style({opacity: 1,
                        '-ms-transform': 'translate3D(0px, 0px, 0px)',
                        '-webkit-transform': 'translate3D(0px, px, 0px)',
                        '-moz-transform': 'translate3D(0px, 0px, 0px)',
                        '-o-transform':'translate3D(0px, 0px, 0px)',
                        transform:'translate3D(0px, 0px, 0px)',
                    }),)
                ])
        ])
    ]
})

export class StockComponent{
    
       private stockArray: Stock[]  = [];

       public imageSrc: string;

       private imageArray: String[] = [];
       private transactions: Transaction[] = [];


        selectedFiles: FileList;
        currentUpload: Upload;

    constructor(private stockService: StockService, private upSvc: UploadImageService, private transactionSvc: TransactionService) { }

    ngOnInit(){
        this.getStock();
        // this.getTransactions();
        // this.getUpdatedUser();

 }



getStock(){
    this.stockArray = []
    
    this.stockService.grabStockArray()
        .subscribe(stock => {
            console.log(stock);
            // this.setImage(stock);
            // this.imageSrc = null;
            this.grabImageUrl(stock);
            this.stockArray.push(stock);
            // this.imageArray.push(stock.imageUrl);


            


            console.log(this.stockArray);
            

        },
        err => {
            console.error("unable to add bug -", err);
        });
    }

// setImage(stock:Stock){
//     this.imageSrc = stock.imageUrl;

// }

      grabImageUrl(currentStock: Stock){
          
              
              this.stockService.stockStorageRef.child(currentStock.imageUrl).getDownloadURL().then(url => 
                    
                    // console.log(url)
                    currentStock.imageStorageRef = url
                    // stock.imageUrl = url
                    
                       
                    ).catch(function(error) {
                // Handle any errors
                console.log(error);
                });
            

          

          
                    
            
                // this.getStock();
        // this.stockService.stockStorageRef.child(stock.imageUrl).getDownloadURL().then(function(url) {
        //         // `url` is the download URL for 'images/stars.jpg'
        //         console.log(url);

        //         this.imageSrc = url;

        //         // // This can be downloaded directly:
        //         // var xhr = new XMLHttpRequest();
        //         // xhr.responseType = 'blob';
        //         // xhr.onload = function(event) {
        //         //     var blob = xhr.response;
        //         // };
        //         // xhr.open('GET', url);
        //         // xhr.send();

        //         // var imgUsed = stock.imageUrl;
        //         // // Or inserted into an <img> element:
        //         // var imgs = document.getElementById('stockImage');
        //         // imgs.id = imgUsed;
        //         }).catch(function(error) {
        //         // Handle any errors
        //         console.log(error);
        //         });


    }

//         detectFiles(event) {
//       this.selectedFiles = event.target.files;
//   }

//   uploadSingle(currentStock?: Stock) {
      
//     let file = this.selectedFiles.item(0)
//     this.currentUpload = new Upload(file);
//     this.upSvc.pushUpload(this.currentUpload, currentStock.id, "stock");
//     // window.location.reload();
      
//   }


 }
