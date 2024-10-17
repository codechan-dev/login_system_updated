import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { ResetPasswordComponent } from './registration/reset-password/reset-password.component';

export const routes: Routes = [
    {
        path:'registration', loadChildren:()=>import("./registration/registration-routing.module").then(e=>e.RegistrationRoutingModule)
    },
    {
        path:'home', loadChildren:()=>import("./home/home-routing.module").then(e=>e.HomeRoutingModule)
    },
    {
        path:'', redirectTo:'registration/signin', pathMatch:'full'
    },
    {
        path: 'registration/resetpass',
        component: ResetPasswordComponent,
      },
    {
        path:'***', component:NotfoundComponent
    }

];
