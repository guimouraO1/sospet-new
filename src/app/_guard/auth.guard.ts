import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const _authService: AuthService = inject(AuthService);
  const protectedRoutes: string[] = ['/home'];
  return protectedRoutes.includes(state.url) && !_authService._isAuthenticated
    ? router.navigate([''])
    : false;

  // return false    
  // if (_authService._isAuthenticated) {
  //   console.log(_authService._isAuthenticated);
  //   return true;
  // } else {
  //   console.log(_authService._isAuthenticated);
  //   return false;
  // }
};
