var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var AWS = require("aws-sdk/global");
var DynamoDB = require("aws-sdk/clients/dynamodb");
/**
 * Created by Vladimir Budilov
 */
var DynamoDBService = (function () {
    function DynamoDBService(cognitoUtil) {
        this.cognitoUtil = cognitoUtil;
        console.log("DynamoDBService: constructor");
    }
    DynamoDBService.prototype.getAWS = function () {
        return AWS;
    };
    DynamoDBService.prototype.getLogEntries = function (mapArray) {
        console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
        var params = {
            TableName: environment_1.environment.ddbTableName,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": this.cognitoUtil.getCognitoIdentity()
            }
        };
        var clientParams = {};
        if (environment_1.environment.dynamodb_endpoint) {
            clientParams.endpoint = environment_1.environment.dynamodb_endpoint;
        }
        var docClient = new DynamoDB.DocumentClient(clientParams);
        docClient.query(params, onQuery);
        function onQuery(err, data) {
            if (err) {
                console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            }
            else {
                // print all the movies
                console.log("DynamoDBService: Query succeeded.");
                data.Items.forEach(function (logitem) {
                    mapArray.push({ type: logitem.type, date: logitem.activityDate });
                });
            }
        }
    };
    DynamoDBService.prototype.writeLogEntry = function (type) {
        try {
            var date = new Date().toString();
            console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + this.cognitoUtil.getCognitoIdentity() + " Date: " + date);
            this.write(this.cognitoUtil.getCognitoIdentity(), date, type);
        }
        catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }
    };
    DynamoDBService.prototype.write = function (data, date, type) {
        console.log("DynamoDBService: writing " + type + " entry");
        var clientParams = {
            params: { TableName: environment_1.environment.ddbTableName }
        };
        if (environment_1.environment.dynamodb_endpoint) {
            clientParams.endpoint = environment_1.environment.dynamodb_endpoint;
        }
        var DDB = new DynamoDB(clientParams);
        // Write the item to the table
        var itemParams = {
            TableName: environment_1.environment.ddbTableName,
            Item: {
                userId: { S: data },
                activityDate: { S: date },
                type: { S: type }
            }
        };
        DDB.putItem(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
        });
    };
    DynamoDBService = __decorate([
        core_1.Injectable()
    ], DynamoDBService);
    return DynamoDBService;
})();
exports.DynamoDBService = DynamoDBService;
//# sourceMappingURL=ddb.service.js.map