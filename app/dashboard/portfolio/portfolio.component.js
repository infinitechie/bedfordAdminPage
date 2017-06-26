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
var portfolio_service_1 = require("../portfolio/service/portfolio.service");
var uploadImages_service_1 = require("../uploadImages/service/uploadImages.service");
var upload_1 = require("../uploadImages/model/upload");
var PortfolioComponent = (function () {
    function PortfolioComponent(portfolioService, upSvc) {
        this.portfolioService = portfolioService;
        this.upSvc = upSvc;
        this.portfolioArray = [];
        this.imageArray = [];
    }
    PortfolioComponent.prototype.ngAfterViewInit = function () {
        this.getStock();
        this.getUpdatedUser();
        // this.getUpdatedUser();
    };
    PortfolioComponent.prototype.getStock = function () {
        var _this = this;
        this.portfolioArray = [];
        this.portfolioService.grabStockArray()
            .subscribe(function (image) {
            console.log(image);
            // this.setImage(stock);
            // this.imageSrc = null;
            _this.grabImageUrl(image);
            _this.portfolioArray.push(image);
            // this.imageArray.push(stock.imageUrl);
            console.log(_this.portfolioArray);
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    PortfolioComponent.prototype.resizeImage = function (file, maxWidth, maxHeight) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = function () {
                var width = image.width;
                var height = image.height;
                if (width <= maxWidth && height <= maxHeight) {
                    resolve(file);
                }
                var newWidth;
                var newHeight;
                if (width > height) {
                    newHeight = height * (maxWidth / width);
                    newWidth = maxWidth;
                }
                else {
                    newWidth = width * (maxHeight / height);
                    newHeight = maxHeight;
                }
                var canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, newWidth, newHeight);
                canvas.toBlob(resolve, file.type);
            };
            image.onerror = reject;
        });
    };
    PortfolioComponent.prototype.grabImageUrl = function (currentImage) {
        this.portfolioService.stockStorageRef.child(currentImage.imageUrl).getDownloadURL().then(function (url) {
            // console.log(url)
            return currentImage.imageStorageRef = url;
        }).catch(function (error) {
            // Handle any errors
            console.log(error);
        });
    };
    PortfolioComponent.prototype.detectFiles = function (event) {
        this.selectedFiles = event.target.files;
    };
    PortfolioComponent.prototype.uploadSingle = function (currentImage) {
        var file = this.selectedFiles.item(0);
        this.resizeImage(file, 200, 200);
        this.currentUpload = new upload_1.Upload(file);
        this.upSvc.uploadPortfolio(this.currentUpload, "portfolio");
        // window.location.reload();
    };
    PortfolioComponent.prototype.updateBug = function (newImage) {
        if (newImage) {
            var currentBugRef = this.portfolioService.portfolioRef.child(newImage.id);
            console.log(newImage.id);
            var file = this.selectedFiles.item(0);
            this.currentUpload = new upload_1.Upload(file);
            this.upSvc.pushUpload(this.currentUpload, newImage.id, "portfolio");
            // newImage.id = null;
            // currentBugRef.update(newImage);
        }
        else {
            console.log("No crash bigash");
        }
    };
    PortfolioComponent.prototype.getUpdatedUser = function () {
        var _this = this;
        this.portfolioService.changedListener()
            .subscribe(function (updatedUser) {
            var userIndex = _this.portfolioArray.map(function (index) { return index.id; }).indexOf(updatedUser['id']);
            _this.portfolioArray[userIndex] = updatedUser;
        }, function (err) {
            console.error("Unable to get updated bug - ", err);
        });
    };
    return PortfolioComponent;
}());
PortfolioComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'portfolio-cmp',
        styleUrls: ['portfolio.components.css'],
        templateUrl: 'portfolio.component.html',
    }),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService, uploadImages_service_1.UploadImageService])
], PortfolioComponent);
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=portfolio.component.js.map