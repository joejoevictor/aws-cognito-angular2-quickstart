import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

declare let AWS: any;
declare let AWSCognito: any;

@Component({
    selector: 'awscognito-angular2-app',
    template: '<p>Hello and welcome!"</p>'
})
export class AboutComponent {

}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './landinghome.html'
})
export class HomeLandingComponent {
    constructor(public router: Router) {
        console.log("HomeLandingComponent constructor");

        // TODO: Redirecting for now. Ideally this should be the component to showcase little apple stuff
        this.router.navigate(['/home/login']);
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

    constructor() {
        console.log("HomeComponent constructor");
    }

    ngOnInit() {

    }
}


