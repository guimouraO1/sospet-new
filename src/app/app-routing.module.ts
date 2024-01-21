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
        title: 'SOSPET | Login',
        loadComponent: () =>
        import('./pages/login/login.component').then(
          (p) => p.LoginComponent
        ),
      },
      {
        path: 'register',
        title: 'SOSPET | Register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (p) => p.RegisterComponent
          ),
      },
      {
        path: 'publications',
        title: 'SOSPET | Find Pet',
        loadComponent: () =>
          import('./pages/find-pet/find-pet.component').then(
            (p) => p.PublicationsComponent
          ),
      },
      {
        path: 'map',
        title: 'SOSPET | Map Pet',
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
        title: 'SOSPET | Home',
        loadComponent: () =>
          import('./pages/homepage/homepage.component').then(
            (p) => p.HomepageComponent
          ),
      },
      {
        path: 'post',
        title: 'SOSPET | Post Pet',
        loadComponent: () =>
          import('./pages/post-pet/post-pet.component').then(
            (p) => p.PostPetComponent
          ),
      },
      {
        path: 'profile',
        title: 'SOSPET | Profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (p) => p.ProfileComponent
          ),
      },
    ],
  },
  {
    path: '**',
    title: '404',
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
