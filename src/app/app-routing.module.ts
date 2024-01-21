import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostPetComponent } from './pages/post-pet/post-pet.component';
import { authGuard, alwaysAllowAuthGuard } from './_guard/auth.guard';
import { MapComponent } from './pages/map/map.component';
import { PublicationsComponent } from './pages/publications/publications.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [alwaysAllowAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
      },
      {
        path: 'register',
        title: 'Register',
        component: RegisterComponent,
      },
      {
        path: 'publications',
        title: 'Find Pet',
        component: PublicationsComponent,
        // loadChildren: () => import('./pages/publications/publications.component').then((p) => p.PublicationsComponent),
      },
      {
        path: 'map',
        title: 'Map Pet',
        component: MapComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomepageComponent,
      },
      {
        path: 'post',
        title: 'Post Pet',
        component: PostPetComponent,
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
