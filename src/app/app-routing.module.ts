import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { PubPetComponent } from './pages/pub-pet/pub-pet.component';


const routes: Routes = [ 
{
  path:'',
  component: LoginComponent,
},
{
  path:'home',
  component: HomepageComponent,
},
{
  path:'publications',
  component: PublicationsComponent,
},
{
  path:'postPet',
  component: PubPetComponent,
},
{
  path:'register',
  component: RegisterComponent,
},
{
  path:'profile',
  component: ProfileComponent,
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
