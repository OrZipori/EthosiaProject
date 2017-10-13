import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { NetworkingService } from './networking.service';

import { LinkedInSdkModule } from 'angular-linkedin-sdk';
import { RegisterationComponent } from './registeration/registeration.component';
import { UsershowComponent } from './usershow/usershow.component';

import { Routing } from './app.routing';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    RegisterationComponent,
    UsershowComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LinkedInSdkModule,
    Routing
  ],
  providers: [
    { provide: 'apiKey', useValue: '770uo61il1c9w5' },
    NetworkingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
