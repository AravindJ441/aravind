import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {}

    canActivate() {
        const authToken = localStorage.getItem("token");
        if(authToken !== null) {
            return true;
        }
        // return this.router.navigate(['403']);
    }
}