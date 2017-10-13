import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'app/app.routing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(["/main"]);
  }
}
