"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
var AWS = require("aws-sdk/global");
var CognitoUtil = CognitoUtil_1 = (function () {
    function CognitoUtil() {
    }
    CognitoUtil.prototype.getUserPool = function () {
        if (environment_1.environment.cognito_idp_endpoint) {
            CognitoUtil_1._POOL_DATA.endpoint = environment_1.environment.cognito_idp_endpoint;
        }
        return new amazon_cognito_identity_js_1.CognitoUserPool(CognitoUtil_1._POOL_DATA);
    };
    CognitoUtil.prototype.getCurrentUser = function () {
        return this.getUserPool().getCurrentUser();
    };
    // AWS Stores Credentials in many ways, and with TypeScript this means that 
    // getting the base credentials we authenticated with from the AWS globals gets really murky,
    // having to get around both class extension and unions. Therefore, we're going to give
    // developers direct access to the raw, unadulterated CognitoIdentityCredentials
    // object at all times.
    CognitoUtil.prototype.setCognitoCreds = function (creds) {
        this.cognitoCreds = creds;
    };
    CognitoUtil.prototype.getCognitoCreds = function () {
        return this.cognitoCreds;
    };
    // This method takes in a raw jwtToken and uses the global AWS config options to build a
    // CognitoIdentityCredentials object and store it for us. It also returns the object to the caller
    // to avoid unnecessary calls to setCognitoCreds.
    CognitoUtil.prototype.buildCognitoCreds = function (idTokenJwt) {
        var url = 'cognito-idp.' + CognitoUtil_1._REGION.toLowerCase() + '.amazonaws.com/' + CognitoUtil_1._USER_POOL_ID;
        if (environment_1.environment.cognito_idp_endpoint) {
            url = environment_1.environment.cognito_idp_endpoint + '/' + CognitoUtil_1._USER_POOL_ID;
        }
        var logins = {};
        logins[url] = idTokenJwt;
        var params = {
            IdentityPoolId: CognitoUtil_1._IDENTITY_POOL_ID,
            Logins: logins
        };
        var serviceConfigs = {};
        if (environment_1.environment.cognito_identity_endpoint) {
            serviceConfigs.endpoint = environment_1.environment.cognito_identity_endpoint;
        }
        var creds = new AWS.CognitoIdentityCredentials(params, serviceConfigs);
        this.setCognitoCreds(creds);
        return creds;
    };
    CognitoUtil.prototype.getCognitoIdentity = function () {
        return this.cognitoCreds.identityId;
    };
    CognitoUtil.prototype.getAccessToken = function (callback) {
        if (callback == null) {
            throw ("CognitoUtil: callback in getAccessToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getAccessToken().getJwtToken());
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    };
    CognitoUtil.prototype.getIdToken = function (callback) {
        if (callback == null) {
            throw ("CognitoUtil: callback in getIdToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getIdToken().getJwtToken());
                    }
                    else {
                        console.log("CognitoUtil: Got the id token, but the session isn't valid");
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    };
    CognitoUtil.prototype.getRefreshToken = function (callback) {
        if (callback == null) {
            throw ("CognitoUtil: callback in getRefreshToken is null...returning");
        }
        if (this.getCurrentUser() != null)
            this.getCurrentUser().getSession(function (err, session) {
                if (err) {
                    console.log("CognitoUtil: Can't set the credentials:" + err);
                    callback.callbackWithParam(null);
                }
                else {
                    if (session.isValid()) {
                        callback.callbackWithParam(session.getRefreshToken());
                    }
                }
            });
        else
            callback.callbackWithParam(null);
    };
    CognitoUtil.prototype.refresh = function () {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log("CognitoUtil: Can't set the credentials:" + err);
            }
            else {
                if (session.isValid()) {
                    console.log("CognitoUtil: refreshed successfully");
                }
                else {
                    console.log("CognitoUtil: refreshed but session is still not valid");
                }
            }
        });
    };
    return CognitoUtil;
}());
CognitoUtil._REGION = environment_1.environment.region;
CognitoUtil._IDENTITY_POOL_ID = environment_1.environment.identityPoolId;
CognitoUtil._USER_POOL_ID = environment_1.environment.userPoolId;
CognitoUtil._CLIENT_ID = environment_1.environment.clientId;
CognitoUtil._POOL_DATA = {
    UserPoolId: CognitoUtil_1._USER_POOL_ID,
    ClientId: CognitoUtil_1._CLIENT_ID
};
CognitoUtil = CognitoUtil_1 = __decorate([
    core_1.Injectable()
], CognitoUtil);
exports.CognitoUtil = CognitoUtil;
var CognitoUtil_1;
