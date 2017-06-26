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
var forms_1 = require("@angular/forms");
var stock_service_1 = require("../../stock/service/stock.service");
var uploadImages_service_1 = require("../../uploadImages/service/uploadImages.service");
var upload_1 = require("../../uploadImages/model/upload");
var transaction_service_1 = require("../../transaction/service/transaction.service");
var stock_1 = require("../../stock/model/stock");
// import { BookingsMissed } from '../../bookings/model/bookingsMissed/bookingsMissed';
// import { Bookings } from '../../bookings/model/bookings/bookings';
var EditStockComponent = (function () {
    function EditStockComponent(formB, customerService, uploadService, transactionSvc) {
        this.formB = formB;
        this.customerService = customerService;
        this.uploadService = uploadService;
        this.transactionSvc = transactionSvc;
        this.transactions = [];
        this.modalId = "modalId";
        this.purchases = [];
        // private statuses = STATUS;
        // private severities = SEVERITY;
        // private statusArr: string[] = [];
        // private severityArr: string[] = [];
        this.currentUser = new stock_1.Stock(null, null, null, null, null, null, null, null, null, null, null, null);
        // private BookingsMissed: BookingsMissed[] = [];
        this.StockList = [];
    }
    EditStockComponent.prototype.ngOnInit = function () {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
        this.hasPurchases = false;
    };
    EditStockComponent.prototype.configureForm = function (product) {
        this.StockList = [];
        //     // this.bugForm = new FormGroup({
        //     //     title: new FormControl(this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]),
        //     //     status: new FormControl(this.currentBug.status, Validators.required),
        //     //     severity: new FormControl(this.currentBug.severity, Validators.required),
        //     //     description: new FormControl(this.currentBug.description, Validators.required)
        //     // });
        if (product) {
            var j = Number(product.dateEntered);
            var dateEntered = new Date(j).toDateString();
            var k = Number(product.dateLastTransaction);
            var dateLastTransaction = new Date(k).toDateString();
            this.currentUser = new stock_1.Stock(product.id, product.name, product.quantity, product.cost, product.vat, product.unitsSold, product.imageUrl, product.currentStock, dateEntered, dateLastTransaction, product.productDescription, product.stockTransactions);
            // this.getPaidBookings();
            // this.getMissedBookings();\
            this.getTransactions(product);
        }
        this.userForm = this.formB.group({
            id: [this.currentUser.id, forms_1.Validators.required],
            name: [this.currentUser.name, forms_1.Validators.required],
            quantity: [this.currentUser.quantity, forms_1.Validators.required],
            cost: [this.currentUser.cost, forms_1.Validators.required],
            vat: [this.currentUser.vat, forms_1.Validators.required],
            unitsSold: [this.currentUser.unitsSold, forms_1.Validators.required],
            imageUrl: [this.currentUser.imageUrl, forms_1.Validators.required],
            currentStock: [this.currentUser.currentStock, forms_1.Validators.required],
            dateEntered: [this.currentUser.dateEntered, forms_1.Validators.required],
            dateLastTransaction: [this.currentUser.dateLastTransaction, forms_1.Validators.required],
            productDescription: [this.currentUser.productDescription, forms_1.Validators.required],
        });
    };
    EditStockComponent.prototype.detectFiles = function (event) {
        this.selectedFiles = event.target.files;
    };
    EditStockComponent.prototype.uploadSingle = function () {
        var file = this.selectedFiles.item(0);
        this.currentUpload = new upload_1.Upload(file);
        this.uploadService.pushUpload(this.currentUpload, this.currentUser.id, "/staff");
    };
    EditStockComponent.prototype.getTransactions = function (stock) {
        var _this = this;
        this.transactions = [];
        this.transactionSvc.grabTransactionArray()
            .subscribe(function (transaction) {
            // console.log(transaction);
            // this.transactions.push(transaction);
            // console.log(this.transactions);
            if (stock.name == transaction.name) {
                console.log(transaction);
                _this.purchases.push(transaction);
                // this.hasBookings = true;
                _this.hasPurchases = true;
                // this.totalIncome.push(user.cost);
                // this.get();
                console.log(_this.purchases);
            }
            else {
                // console.log("WWWWWWW");
                // console.log(transaction);
            }
        }, function (err) {
            console.error("unable to add bug -", err);
        });
    };
    // makeCustomerLoyal(customer: Stock){
    //     if (customer.hasApp == "Yes" ||  customer.hasApp == "No") {
    //             this.customerService.customersRef.child(customer.id).update({
    //                 hasApp: "Loyal"
    //             });
    //     } else {
    //         this.customerService.customersRef.child(customer.id).update({
    //                 hasApp: "Yes"
    //             });
    //     }
    // }
    // deleteUser(customer: Stock){
    //     if (customer.credit > 0) {
    //             alert("Cannot Delete User with Money in Account");
    //     } else {
    //         this.customerService.customersRef.child(customer.id).remove();
    //     }
    // }
    EditStockComponent.prototype.submitForm = function () {
        //  name: [this.currentUser.name, Validators.required],
        //     quantity: [this.currentUser.quantity, Validators.required],
        //     cost: [this.currentUser.cost, Validators.required],
        //     vat: [this.currentUser.vat, Validators.required],
        //     unitsSold: [this.currentUser.unitsSold, Validators.required],
        //     imageUrl: [this.currentUser.imageUrl, Validators.required],
        //     currentStock: [this.currentUser.currentStock, Validators.required],
        //     dateEntered: [this.currentUser.dateEntered, Validators.required],
        //     dateLastTransaction: [this.currentUser.dateLastTransaction, Validators.required],
        // unitsSold: [this.currentUser.unitsSold, Validators.required],
        this.currentUser.name = this.userForm.value["name"];
        this.currentUser.quantity = this.userForm.value["quantity"];
        this.currentUser.cost = this.userForm.value["cost"];
        this.currentUser.vat = this.userForm.value["vat"];
        this.currentUser.unitsSold = this.userForm.value["unitsSold"];
        this.currentUser.currentStock = this.userForm.value["currentStock"];
        this.currentUser.dateEntered = this.userForm.value["dateEntered"];
        this.currentUser.imageUrl = this.userForm.value["imageUrl"];
        this.currentUser.dateLastTransaction = this.userForm.value["dateLastTransaction"];
        this.currentUser.productDescription = this.userForm.value["productDescription"];
        // if (this.currentUser.id) {
        //     // this.updateUser();
        // } else {
        //     // this.addUser();
        // }
    };
    // addUser() {
    //     this.customerService.addUser(this.currentUser);
    // }
    EditStockComponent.prototype.updateUser = function () {
        // this.customerService.updateBug(this.currentUser);
    };
    EditStockComponent.prototype.freshForm = function () {
        // this.userForm.reset({  });
        this.cleanUserForm();
    };
    EditStockComponent.prototype.cleanUserForm = function () {
        this.currentUser = new stock_1.Stock(null, null, null, null, null, null, null, null, null, null, null, null);
        this.purchases = [];
        this.hasPurchases = false;
    };
    return EditStockComponent;
}());
EditStockComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'editStockComponent',
        templateUrl: 'editStockComponent.component.html',
        styleUrls: ['editStockComponent.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, stock_service_1.StockService, uploadImages_service_1.UploadImageService, transaction_service_1.TransactionService])
], EditStockComponent);
exports.EditStockComponent = EditStockComponent;
//# sourceMappingURL=editStockComponent.component.js.map