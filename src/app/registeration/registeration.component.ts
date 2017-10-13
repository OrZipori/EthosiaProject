import { Component, OnInit } from '@angular/core';
import { LinkedInService } from 'angular-linkedin-sdk';
import { User } from 'app/user';
import { NgForm } from '@angular/forms';
import { NetworkingService } from 'app/networking.service';
import { LoaderComponent} from 'app/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  user: User = new User();
  public isUserAuthenticated;
  isLoading: boolean = false;
  showReg: boolean = false;

  constructor(private _linkedInService: LinkedInService, private networkingService: NetworkingService, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  public onSubmit(form: NgForm) {
    this.user.firstName = form.value["fName"];
    this.user.lastName = form.value["lName"];
    this.user.headline = form.value["headline"];
    this.user.email = form.value["email"];
    this.user.cellphone = form.value["cellphone"];

    this.loader(true);

    let promise = this.networkingService.register(this.user);
    promise.then((data)=> data.json())
    .then((data)=> {
      console.log(data);
      if (data.success) {
        this.router.navigate(["/show"]);
      } else {
        this.loader(false);
        alert("error updating, please try again");
      }
    })
    .catch((e) => console.log(e));
  }

  private fetchData() {
    this.loader(true);
    const url = '/people/~:(firstName,lastName,headline,email-address,id)?format=json';
    this._linkedInService.raw(url)
      .asObservable()
        .subscribe({
          next: (data) => {
            this.user.id = data["id"];
            this.user.firstName = data["firstName"];
            this.user.lastName = data["lastName"];
            this.user.headline = data["headline"];
            this.user.email = data["emailAddress"];
            console.log(this.user);

            // for session
            sessionStorage.setItem("id", data["id"]);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log("LinkedIn call completed");
            this.loader(false);
          }
    });
  }

  private loader(mode) {
    if (mode) {
      this.isLoading = true;
      this.showReg = false;
    } else {
      this.isLoading = false;
      this.showReg = true;
    }
  }

}
