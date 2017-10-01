import {Injectable} from '@angular/core';
import {Student} from './student.service';
import * as SNS from 'aws-sdk/clients/sns';

@Injectable()
export class SnsService {
    constructor() {
        console.log('SnsService constructor');
    }

    notifyParents(student: Student, message: string) {
        let snsClient = new SNS();

        student.guardianNumbers.forEach(function(number: string) {
            let params = {
                Message: message,
                PhoneNumber: number
            };
            snsClient.publish(params, function cb(err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    console.log('Message Sent for ' + student.studentId + ' to ' + number);
                }
            });
        });
    }
}
