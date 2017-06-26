"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { Bookings } from '../../bookings/model/bookings/bookings';
var firebase_config_service_1 = require("../../../core/services/firebase-config.service");
var UploadImageService = (function () {
    function UploadImageService(fire) {
        this.fire = fire;
        this.databaseRef = this.fire._database.ref();
        // public databasePortfolioRef = this.fire.database.ref()
        //   public storageLocation = '/stock'
        this.uploadTask = this.fire.storageUploadTask;
    }
    //   private taskChange = this.fire.storageTask;
    //   uploads: FirebaseListObservable;
    UploadImageService.prototype.pushUpload = function (upload, staffId, storageLocation) {
        var _this = this;
        var storageRef = this.fire.storage.ref();
        this.uploadTask = storageRef.child("" + upload.file.name).put(upload.file);
        this.uploadTask.on('state_changed', function (snapshot) {
            // upload in progress
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function (error) {
            // upload failed
            console.log(error);
        }, function () {
            // upload success
            upload.url = _this.uploadTask.snapshot.downloadURL;
            upload.name = upload.file.name;
            _this.saveFileDataStock(upload, staffId, storageLocation);
        });
    };
    UploadImageService.prototype.uploadPortfolio = function (upload, storageLocation) {
        var _this = this;
        var storageRef = this.fire.storage.ref();
        this.uploadTask = storageRef.child("" + upload.file.name).put(upload.file);
        this.uploadTask.on('state_changed', function (snapshot) {
            // upload in progress
            upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function (error) {
            // upload failed
            console.log(error);
        }, function () {
            // upload success
            upload.url = _this.uploadTask.snapshot.downloadURL;
            upload.name = upload.file.name;
            _this.savePortfolioImage(upload, storageLocation);
        });
    };
    // Writes the file details to the realtime db
    UploadImageService.prototype.saveFileDataStock = function (upload, staff, storageLocation) {
        // this.db.list(`${this.basePath}/`).push(upload);
        this.databaseRef.child(storageLocation).child(staff).update({
            imageUrl: upload.name
        });
    };
    // Writes the file details to the realtime db
    UploadImageService.prototype.savePortfolioImage = function (upload, storageLocation) {
        // this.db.list(`${this.basePath}/`).push(upload);
        var ranomUid = Math.random().toString(36).substring(7);
        this.databaseRef.child(storageLocation).child(ranomUid).update({
            imageUrl: upload.name
        });
    };
    return UploadImageService;
}());
UploadImageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [firebase_config_service_1.FirebaseConfigService])
], UploadImageService);
exports.UploadImageService = UploadImageService;
//# sourceMappingURL=uploadImages.service.js.map