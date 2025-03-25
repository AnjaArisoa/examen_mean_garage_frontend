import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice/auth.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
