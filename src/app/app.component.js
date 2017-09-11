var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @author Vladimir Budilov
 *
 * This is the entry-way into the routing logic. This is the first component that's called when the app
 * loads.
 *
 */
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent(awsUtil, userService, cognito) {
        this.awsUtil = awsUtil;
        this.userService = userService;
        this.cognito = cognito;
        console.log("AppComponent: constructor");
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("AppComponent: Checking if the user is already authenticated");
        this.userService.isAuthenticated(this);
    };
    AppComponent.prototype.isLoggedIn = function (message, isLoggedIn) {
        console.log("AppComponent: the user is authenticated: " + isLoggedIn);
        var mythis = this;
        this.cognito.getIdToken({
            callback: function () {
            },
            callbackWithParam: function (token) {
                // Include the passed-in callback here as well so that it's executed downstream
                console.log("AppComponent: calling initAwsService in callback");
                mythis.awsUtil.initAwsService(null, isLoggedIn, token);
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'template/app.html'
        })
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map