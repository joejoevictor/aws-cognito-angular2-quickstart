import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {UserRegistrationService} from './service/user-registration.service';
import {UserParametersService} from './service/user-parameters.service';
import {UserLoginService} from './service/user-login.service';
import {CognitoUtil} from './service/cognito.service';
import {routing} from './app.routes';
import {AboutComponent, HomeComponent, HomeLandingComponent} from './public/home.component';
import {AwsUtil} from './service/aws.service';
import {UseractivityComponent} from './secure/useractivity/useractivity.component';
import {MyProfileComponent} from './secure/profile/myprofile.component';
import {SecureHomeComponent} from './secure/landing/securehome.component';
import {JwtComponent} from './secure/jwttokens/jwt.component';
import {DynamoDBService} from './service/ddb.service';
import {LoginComponent} from './public/auth/login/login.component';
import {RegisterComponent} from './public/auth/register/registration.component';
import {ForgotPassword2Component, ForgotPasswordStep1Component} from './public/auth/forgot/forgotPassword.component';
import {LogoutComponent, RegistrationConfirmationComponent} from './public/auth/confirm/confirmRegistration.component';
import {ResendCodeComponent} from './public/auth/resend/resendCode.component';
import {NewPasswordComponent} from './public/auth/newpassword/newpassword.component';
import {KioskComponent} from './secure/kiosk/kiosk.component';
import {StudentService} from './service/student.service';
import {GuidService} from './service/guid.service';
import {MdlModule} from '@angular-mdl/core';
import {AttendanceDialogComponent} from './secure/kiosk/attendance-dialog.component';
import {SnsService} from './service/sns.service';


@NgModule({
    declarations: [
        NewPasswordComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        UseractivityComponent,
        MyProfileComponent,
        KioskComponent,
        AttendanceDialogComponent,
        SecureHomeComponent,
        JwtComponent,
        AppComponent
    ],
    imports: [
        MdlModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    entryComponents: [
        AttendanceDialogComponent
    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        DynamoDBService,
        SnsService,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        StudentService,
        GuidService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
