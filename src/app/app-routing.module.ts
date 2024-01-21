import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, alwaysAllowAuthGuard } from './_guard/auth.guard';

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
        loadComponent: () =>
        import('./pages/login/login.component').then(
          (p) => p.LoginComponent
        ),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (p) => p.RegisterComponent
          ),
      },
      {
        path: 'publications',
        title: 'Find Pet',
        loadComponent: () =>
          import('./pages/find-pet/find-pet.component').then(
            (p) => p.PublicationsComponent
          ),
      },
      {
        path: 'map',
        title: 'Map Pet',
        loadComponent: () =>
          import('./pages/map/map.component').then((p) => p.MapComponent),
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
        loadComponent: () =>
          import('./pages/homepage/homepage.component').then(
            (p) => p.HomepageComponent
          ),
      },
      {
        path: 'post',
        title: 'Post Pet',
        loadComponent: () =>
          import('./pages/post-pet/post-pet.component').then(
            (p) => p.PostPetComponent
          ),
      },
      {
        path: 'profile',
        title: 'Profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (p) => p.ProfileComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (p) => p.NotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
