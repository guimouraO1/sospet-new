import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const _authService: AuthService = inject(AuthService);
  
  console.log(_authService._isAuthenticated);

  return true;
  // if (_authService._isAuthenticated) {
  //   console.log(_authService._isAuthenticated);
  //   return true;
  // } else {
  //   console.log(_authService._isAuthenticated);
  //   return false;
  // }
};
