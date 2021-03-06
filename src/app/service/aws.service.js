"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cognito_service_1 = require("./cognito.service");
var AWS = require("aws-sdk/global");
/**
 * Created by Vladimir Budilov
 */
// declare var AMA: any;
var AwsUtil = AwsUtil_1 = (function () {
    function AwsUtil(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
        AWS.config.region = cognito_service_1.CognitoUtil._REGION;
    }
    /**
     * This is the method that needs to be called in order to init the aws global creds
     */
    AwsUtil.prototype.initAwsService = function (callback, isLoggedIn, idToken) {
        if (AwsUtil_1.runningInit) {
            // Need to make sure I don't get into an infinite loop here, so need to exit if this method is running already
            console.log("AwsUtil: Aborting running initAwsService()...it's running already.");
            // instead of aborting here, it's best to put a timer
            if (callback != null) {
                callback.callback();
                callback.callbackWithParam(null);
            }
            return;
        }
        console.log("AwsUtil: Running initAwsService()");
        AwsUtil_1.runningInit = true;
        var mythis = this;
        // First check if the user is authenticated already
        if (isLoggedIn)
            mythis.setupAWS(isLoggedIn, callback, idToken);
    };
    /**
     * Sets up the AWS global params
     *
     * @param isLoggedIn
     * @param callback
     */
    AwsUtil.prototype.setupAWS = function (isLoggedIn, callback, idToken) {
        console.log("AwsUtil: in setupAWS()");
        if (isLoggedIn) {
            console.log("AwsUtil: User is logged in");
            // Setup mobile analytics
            var options = {
                appId: '32673c035a0b40e99d6e1f327be0cb60',
                appTitle: "aws-cognito-angular2-quickstart"
            };
            // TODO: The mobile Analytics client needs some work to handle Typescript. Disabling for the time being.
            // var mobileAnalyticsClient = new AMA.Manager(options);
            // mobileAnalyticsClient.submitEvents();
            this.addCognitoCredentials(idToken);
            console.log("AwsUtil: Retrieving the id token");
        }
        else {
            console.log("AwsUtil: User is not logged in");
        }
        if (callback != null) {
            callback.callback();
            callback.callbackWithParam(null);
        }
        AwsUtil_1.runningInit = false;
    };
    AwsUtil.prototype.addCognitoCredentials = function (idTokenJwt) {
        var creds = this.cognitoUtil.buildCognitoCreds(idTokenJwt);
        AWS.config.credentials = creds;
        creds.get(function (err) {
            if (!err) {
                if (AwsUtil_1.firstLogin) {
                    // save the login info to DDB
                    this.ddb.writeLogEntry("login");
                    AwsUtil_1.firstLogin = false;
                }
            }
        });
    };
    AwsUtil.getCognitoParametersForIdConsolidation = function (idTokenJwt) {
        console.log("AwsUtil: enter getCognitoParametersForIdConsolidation()");
        var url = 'cognito-idp.' + cognito_service_1.CognitoUtil._REGION.toLowerCase() + '.amazonaws.com/' + cognito_service_1.CognitoUtil._USER_POOL_ID;
        var logins = [];
        logins[url] = idTokenJwt;
        var params = {
            IdentityPoolId: cognito_service_1.CognitoUtil._IDENTITY_POOL_ID,
            Logins: logins
        };
        return params;
    };
    return AwsUtil;
}());
AwsUtil.firstLogin = false;
AwsUtil.runningInit = false;
AwsUtil = AwsUtil_1 = __decorate([
    core_1.Injectable()
], AwsUtil);
exports.AwsUtil = AwsUtil;
var AwsUtil_1;
