import { Component, OnInit } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';
import { Router } from '@angular/router';
import { Routing } from 'app/app.routing';
import { NetworkingService } from 'app/networking.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _linkedInService: LinkedInService, private router: Router, private networkingService: NetworkingService) {}

  public authentication() {
    // LinkedIn
    this._linkedInService.login().subscribe({
      next: (state) => {
        console.log(state);
        if (state) {
          this.getUserID();
        } else {
          alert("Must authorize access");
        }
      }
    });
  }

  private checkExistence(id: string) {
    let promise = this.networkingService.pullData(id);

    promise.then((data) => data.json())
    .then((data) => {
      // check if the json is not an empty object -- meaning use exists.
      if (Object.keys(data).length > 0) {
        sessionStorage.setItem("id", id);
        this.router.navigate(["/show"]);
      } else {
        this.router.navigate(["/register"]);
      }
    })
    .catch((e) => console.log(e));
  }

  private getUserID() {
    const url = '/people/~:(id)?format=json';
    this._linkedInService.raw(url)
      .asObservable()
        .subscribe({
          next: (data) => {
            this.checkExistence(data["id"]);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log("LinkedIn call completed");
          }
    });
  }

  ngOnInit() {
  }

}
