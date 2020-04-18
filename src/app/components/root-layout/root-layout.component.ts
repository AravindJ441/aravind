import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/API.service";

@Component({
  template: `
  <h1>This is root layout component
  `
})
export class RootLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private actr: ActivatedRoute,
    private api: ApiService,
  ) {

  }

  ngOnInit() {
    // FIXME: As there no access token here, currently we will not be able to get a response from this protected API that is being called here 
    // Make sure to implement some authentication mechanism here
    this.api.dashboardGraphData().subscribe((response: any) => {
      if (response.success) {
        this.router.navigate(['dashboard/graph']);
      } else {
        localStorage.removeItem('token');
        this.router.navigate(['403']);
      }
    });
    // FIXME : I'm not sure why you guys are using queryParams to get somthing confidential and that too on root path
    // commenting below loc for now 
    // this.actr.queryParams.subscribe((queryParams) => {
    //   const token = (queryParams || {}).parmater;
    //   if (token) {
    //     localStorage.setItem('token', token);
    //     this.api.dashboardGraphData().subscribe((response: any) => {
    //       if (response.success) {
    //         this.router.navigate(['dashboard/graph']);
    //       } else {
    //         localStorage.removeItem('token');
    //         this.router.navigate(['403']);
    //       }
    //     });
    //   } else {
    //     localStorage.removeItem('token');
    //     this.router.navigate(['403']);
    //   }
    // });
  }
}
