import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/AuthService';

export const authenticatedGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.isAuthenticated() || router.createUrlTree(['login']);
};
