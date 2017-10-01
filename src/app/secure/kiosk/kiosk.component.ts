import {CognitoUtil, LoggedInCallback} from '../../service/cognito.service';
import {Component} from '@angular/core';
import {UserLoginService} from '../../service/user-login.service';
import {Router} from '@angular/router';
import {Student, StudentsCallback, StudentService} from '../../service/student.service';
import {MdlDialogReference, MdlDialogService} from '@angular-mdl/core';
import {AttendanceDialogComponent} from "./attendance-dialog.component";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './kiosk.html'
})
export class KioskComponent implements LoggedInCallback, StudentsCallback {
    private studentMap: Map<string, Student>;
    private studentArray: Array<Student>;
    private studentsPerRow: number;

    constructor (
        public router: Router,
        public userService: UserLoginService,
        public cognitoUtil: CognitoUtil,
        public studentService: StudentService,
        public dialogService: MdlDialogService
    ) {
        this.userService.isAuthenticated(this);
        this.studentMap = new Map<string, Student>();
        this.studentArray = new Array<Student>();
        this.studentsPerRow = 4;
        console.log('In KioskComponent');
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            this.studentService.getStudents(this);
        }
    }

    setStudents(error: Error, students: Map<string, Student>, studentArray: Array<Student>) {
        if (error) {
            // TODO: Unable to fetch students, promt some error message
        } else {
            this.studentMap = students;
            this.studentArray = studentArray;
            this.studentArray.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        }
    }

    showAttendanceDialog (student: Student) {
        console.log('[Kiosk Component]: Selected studentName=%s, studentId=%s', student.name, student.studentId);

        let attendanceDialog = this.dialogService.showCustomDialog({
            component: AttendanceDialogComponent,
            providers: [{
                provide: Student,
                useValue: student
            }],
            isModal: true,
            clickOutsideToClose: true,
            styles: {
                'width': '300px'
            }
        });

        attendanceDialog.subscribe((dialogReference: MdlDialogReference) => {
            console.log('Dialog opened', dialogReference);
        });
    }
}
