"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_module_1 = require("../../core/core.module");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var createTask_component_1 = require("./createTask/createTask.component");
var firebase_config_service_1 = require("../../core/services/firebase-config.service");
// Services
var toDo_service_1 = require("../toDo/service/toDo.service");
// import {CapitalizePipe} from "../../dashboard/pipes/capitalize.pipe";
var ToDoModule = (function () {
    function ToDoModule() {
    }
    return ToDoModule;
}());
ToDoModule = __decorate([
    core_1.NgModule({
        imports: [core_module_1.CoreModule, common_1.CommonModule, forms_1.FormsModule, forms_2.ReactiveFormsModule],
        declarations: [createTask_component_1.CreateTaskComponent],
        exports: [createTask_component_1.CreateTaskComponent],
        providers: [toDo_service_1.ToDoService, firebase_config_service_1.FirebaseConfigService]
    })
], ToDoModule);
exports.ToDoModule = ToDoModule;
//# sourceMappingURL=todo.module.js.map