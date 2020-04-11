import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/API.service";

@Component({
  template: ``
})
export class RootLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private actr: ActivatedRoute,
    private api: ApiService,
  ) {

  }

  ngOnInit() {
    this.actr.queryParams.subscribe((queryParams) => {
      const token = (queryParams || {}).parmater;
      if (token) {
        localStorage.setItem('token', token);
        this.api.dashboardGraphData().subscribe((response: any) => {
          if(response.success) {
            this.router.navigate(['dashboard/graph']);
          } else {
            localStorage.removeItem('token');
            this.router.navigate(['403']);
          }
        });
      } else {
        localStorage.removeItem('token');
        this.router.navigate(['403']);
      }
    });
  }
}
