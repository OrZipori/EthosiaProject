import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <img id="loader" src="assets/loader.gif" alt="loader"/>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
