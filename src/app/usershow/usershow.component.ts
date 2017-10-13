import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { LinkedInService } from 'angular-linkedin-sdk';
import { NetworkingService } from 'app/networking.service';
import { Router } from '@angular/router';
import { LoaderComponent} from 'app/loader/loader.component';
@Component({
  selector: 'app-usershow',
  templateUrl: './usershow.component.html',
  styleUrls: ['./usershow.component.css']
})
export class UsershowComponent implements OnInit {
  user: User = new User();
  showList: boolean = false;
  isLoading: boolean = false;

  constructor(private _linkedInService: LinkedInService, private networkingService: NetworkingService, private router: Router) { }

  ngOnInit() {
    let id = localStorage.getItem("id");
    this.pullData(id);
  }

  private loader(mode) {
    if (mode) {
      this.isLoading = true;
      this.showList = false;
    } else {
      this.isLoading = false;
      this.showList = true;
    }
  }

  public logout() {
    // a fix for CSP error from LinkedIn.
    setTimeout(()=>{
      sessionStorage.clear();
      window.location.href = "/";
    }, 1500);
    this._linkedInService.logout().subscribe({
      error: () => {
        console.log("error");
      },
      next: () => {
        console.log("logging out");
      },
      complete: () => {
        // end the session
        console.log("logout");
      }
    });
  }

  private pullData(id: string) {
    let promise = this.networkingService.pullData(id);

    promise.then((data) => data.json())
    .then((data) => {
      console.log(data);
      this.user.id = data["id"];
      this.user.firstName = data["firstName"];
      this.user.lastName = data["lastName"];
      this.user.headline = data["headline"];
      this.user.email = data["email"];
      this.user.cellphone = data["cellphone"];
      this.loader(false);
    })
    .catch((e) => console.log(e));
  }

}
