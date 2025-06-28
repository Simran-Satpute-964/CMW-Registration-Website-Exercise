import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegistrationComponent } from './registration/registration';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "registration", component: RegistrationComponent}
];
