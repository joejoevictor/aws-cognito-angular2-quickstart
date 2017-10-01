"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Stuff = (function () {
    function Stuff() {
    }
    return Stuff;
}());
exports.Stuff = Stuff;
var UseractivityComponent = (function () {
    function UseractivityComponent(router, ddb, userService) {
        this.router = router;
        this.ddb = ddb;
        this.userService = userService;
        this.logdata = [];
        this.userService.isAuthenticated(this);
        console.log("in UseractivityComponent");
    }
    UseractivityComponent.prototype.isLoggedIn = function (message, isLoggedIn) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }
        else {
            console.log("scanning DDB");
            this.ddb.getLogEntries(this.logdata);
        }
    };
    return UseractivityComponent;
}());
UseractivityComponent = __decorate([
    core_1.Component({
        selector: 'awscognito-angular2-app',
        templateUrl: './useractivity.html'
    })
], UseractivityComponent);
exports.UseractivityComponent = UseractivityComponent;
