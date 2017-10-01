import {Component, Inject, OnInit} from '@angular/core';
import {MdlDialogReference, MdlDialogService} from '@angular-mdl/core';
import {Student} from '../../service/student.service';
import {SnsService} from '../../service/sns.service';

enum Action {
    CheckIn,
    CheckOut
}

@Component({
    selector: 'attendance-dialog',
    templateUrl: './attendance-dialog.html'
})
export class AttendanceDialogComponent implements OnInit {
    private student: Student;
    private action: Action;
    private selectedAction: boolean;

    constructor(
        private dialog: MdlDialogReference,
        private snsService: SnsService,
        @Inject(Student) student: Student
    ) {
        console.log('AttendanceDialogComponent constructor');
        this.student = student;
        this.action = null;
        this.selectedAction = false;
    }

    ngOnInit(): void {
    }

    checkin(student: Student) {
        this.showConfirmationDialog(this.student, Action.CheckIn);
    }

    checkout(student: Student) {
        this.showConfirmationDialog(this.student, Action.CheckOut);
    }

    showConfirmationDialog (student: Student, action: Action) {
        console.log('[AttendanceDialogComponent]: Selected studentName=%s, studentId=%s, action=%s',
            student.name, student.studentId, this.action);

        this.action = action;
        this.selectedAction = true;

        console.log(this.selectedAction);
    }

    sendNotification(): void {
        if (!this.student) {
            console.error('Student is not selected');
            return;
        }

        let currentTime = new Date().toLocaleString();
        let msg = 'Dear Little Apple Parents! ' + this.student.name + ' has '
            + (this.action === Action.CheckIn ? 'checked-in' : 'checked-out') + ' at ' + currentTime.toString();

        this.snsService.notifyParents(this.student, msg);
        this.dialog.hide();
    }

    deselectAction() {
        this.action = null;
        this.selectedAction = false;
    }

    closeDialog() {
        this.dialog.hide();
    }
}
