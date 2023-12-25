import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [ 
{
  path:'',
  component: LoginComponent,
},
{
  path:'home',
  component: HomepageComponent,
  canActivate: [AuthGuard]
},
{
  path:'register',
  component: RegisterComponent,
},
{
  path:'**',
  component: NotFoundComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
