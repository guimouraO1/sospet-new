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
        title: 'sospet | Login',
        loadComponent: () =>
        import('./pages/login/login.component').then(
          (p) => p.LoginComponent
        ),
      },
      {
        path: 'register',
        title: 'sospet | Register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (p) => p.RegisterComponent
          ),
      },
      {
        path: 'publications',
        title: 'sospet | Find Pet',
        loadComponent: () =>
          import('./pages/find-pet/find-pet.component').then(
            (p) => p.PublicationsComponent
          ),
      },
      {
        path: 'map',
        title: 'sospet | Map Pet',
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
        title: 'sospet | Home',
        loadComponent: () =>
          import('./pages/homepage/homepage.component').then(
            (p) => p.HomepageComponent
          ),
      },
      {
        path: 'post',
        title: 'sospet | Post Pet',
        loadComponent: () =>
          import('./pages/post-pet/post-pet.component').then(
            (p) => p.PostPetComponent
          ),
      },
      {
        path: 'profile',
        title: 'sospet | Profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (p) => p.ProfileComponent
          ),
      },
    ],
  },
  {
    path: '**',
    title: 'sospet | 404',
    canActivate: [alwaysAllowAuthGuard],
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
