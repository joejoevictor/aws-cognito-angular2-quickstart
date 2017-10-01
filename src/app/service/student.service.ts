import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import {CognitoUtil} from './cognito.service';
import {isNullOrUndefined} from 'util';

export class Student {
    studentId: string;
    name: string;
    guardianNumbers: Array<string>;
    profileUrl: string;

    constructor(studentId: string, name: string, guardianNumbers?: Array<string>) {
        this.studentId = studentId;
        this.name = name;
        if (!isNullOrUndefined(this.guardianNumbers)) {
            this.guardianNumbers = guardianNumbers;
        }
        this.profileUrl = 'https://s3-us-west-2.amazonaws.com/little-apple-students/profile_pics/' + this.studentId + '.jpeg';
    }
}

export interface StudentsCallback {
    setStudents(error: Error, studentMap: Map<string, Student>, studentArray: Array<Student>): void;
}

@Injectable()
export class StudentService {
    LOG_PREFIX: string;

    constructor(public cognitoUtil: CognitoUtil) {
        console.log('Student Service: constructor');
        this.LOG_PREFIX = '[Student Service]: ';
    }

    // getStudents(students: Map<string, Student>) {
    getStudents(callback: StudentsCallback) {
        console.log(this.LOG_PREFIX + 'Scanning DDB Students Record');

        let params = {
            TableName: environment.ddbStudentTableName
        };

        let clientParams: any = {};
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        let docClient = new DynamoDB.DocumentClient(clientParams);
        let students = new Map<string, Student>();

        docClient.scan(params, function(err, scanOutput) {
            if (err) {
                console.log(this.LOG_PREFIX + 'Unable to query the table. Error JSON:'
                    + JSON.stringify(err, null, 2));
                callback.setStudents(err, null, null);
            } else {
                let studentArray = new Array<Student>();
                scanOutput.Items.filter(item => item.currentlyEnrolled === true).forEach(function(item) {
                    let student = new Student(item.studentId, item.name);
                    if (item.guardianNumbers) {
                        student.guardianNumbers = item.guardianNumbers;
                    }
                    students.set(item.studentId, student);
                    studentArray.push(student);
                });
                callback.setStudents(null, students, studentArray);
            }
        });
    }
 }
