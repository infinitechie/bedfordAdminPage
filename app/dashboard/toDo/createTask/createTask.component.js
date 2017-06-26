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
// import { CustomerService } from '../../customers/service/customers.service';
var toDo_service_1 = require("../../toDo/service/toDo.service");
// import { Customers } from '../../customers/model/customers';
var toDo_1 = require("../../toDo/model/toDo");
var CreateTaskComponent = (function () {
    function CreateTaskComponent(formB, toDoSvc) {
        this.formB = formB;
        this.toDoSvc = toDoSvc;
        this.modalId = "bugModal";
        // private statuses = STATUS;
        // private severities = SEVERITY;
        // private statusArr: string[] = [];
        // private severityArr: string[] = [];
        this.date = new Date();
        this.buttonState = "Save";
        this.currentTask = new toDo_1.ToDo(null, null, "false", this.date.toDateString(), null);
        this.tasks = [];
    }
    CreateTaskComponent.prototype.ngOnInit = function () {
        // this.statusArr = Object.keys(this.statuses).filter(Number);
        // this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    };
    CreateTaskComponent.prototype.configureForm = function (task) {
        this.tasks = [];
        if (task) {
            // this.printButton();
            var j = Number(task.dateCompleted);
            var date = new Date(j).toDateString();
            this.currentTask = new toDo_1.ToDo(task.id, task.name, task.completed, task.dateCompleted, task.staffMemberAssigned);
        }
        else {
            // this.saveButton();
        }
        this.userForm = this.formB.group({
            // id: [this.currentTransaction.id, Validators.required],
            name: [this.currentTask.name, forms_1.Validators.required],
            completed: [this.currentTask.completed, forms_1.Validators.required],
            dateCompleted: [this.currentTask.dateCompleted, forms_1.Validators.required],
            staffMember: [this.currentTask.staffMemberAssigned, forms_1.Validators.required],
        });
    };
    CreateTaskComponent.prototype.submitForm = function () {
        // this.currentBug.title = this.bugForm.value["title"];
        // this.currentBug.status = this.bugForm.value["status"];
        // this.currentBug.severity = this.bugForm.value["severity"];
        // this.currentBug.description = this.bugForm.value["description"];
        this.currentTask.name = this.userForm.value["name"];
        this.currentTask.completed = this.userForm.value["completed"];
        this.currentTask.dateCompleted = this.userForm.value["dateCompleted"];
        this.currentTask.staffMemberAssigned = this.userForm.value["staffMember"];
        // this.currentTransaction.serviceType = this.userForm.value["serviceType"];
        // this.currentTransaction.customerId = this.userForm.value["customerId"];
        // this.currentTransaction.date = this.date.toDateString();
        // this.currentTransaction.id = this.currentTransaction.id;
        this.addUser();
        // if (this.currentTransaction.name) {
        //     this.printButton();
        // } else {
        // }
        this.cleanUserForm();
    };
    CreateTaskComponent.prototype.addUser = function () {
        this.toDoSvc.addUser(this.currentTask);
    };
    CreateTaskComponent.prototype.updateUser = function () {
        this.toDoSvc.updateBug(this.currentTask);
    };
    CreateTaskComponent.prototype.freshForm = function () {
        // this.userForm.reset({  });
        this.cleanUserForm();
    };
    CreateTaskComponent.prototype.cleanUserForm = function () {
        this.currentTask = new toDo_1.ToDo(null, null, "false", this.date.toDateString(), null);
    };
    CreateTaskComponent.prototype.completeTask = function (task) {
        if (task.completed == "false") {
            this.toDoSvc.toDoRef.child(task.id).update({
                completed: "true",
                dateCompleted: this.date.toDateString()
            });
        }
        else {
            this.toDoSvc.toDoRef.child(task.id).update({
                completed: "false"
            });
        }
    };
    // printButton(){
    //     this.buttonState = "Print";
    // }
    // saveButton(){
    //     this.buttonState = "Save";
    // }
    CreateTaskComponent.prototype.printMe = function () {
        window.print();
    };
    return CreateTaskComponent;
}());
CreateTaskComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'createTask',
        templateUrl: 'createTask.component.html',
        styleUrls: ['createTask.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, toDo_service_1.ToDoService])
], CreateTaskComponent);
exports.CreateTaskComponent = CreateTaskComponent;
//# sourceMappingURL=createTask.component.js.map