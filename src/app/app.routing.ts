import { Routes, RouterModule } from '@angular/router';
import { RegisterationComponent } from "app/registeration/registeration.component";
import { UsershowComponent } from "./usershow/usershow.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
    //full : makes sure the path is absolute path
    { path: 'register', component: RegisterationComponent },
    { path: 'show', component: UsershowComponent },
    { path: 'main', component: MainComponent },
    { path: '', redirectTo: '/main', pathMatch: 'full' },
];

export const Routing = RouterModule.forRoot(routes);
