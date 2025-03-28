import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice/auth.service';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const role = authService.getUserRole();

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Vérifier si le rôle de l'utilisateur correspond à celui requis pour la route
  const requiredRole = route.data['role']; // Le rôle requis est stocké dans 'data' de la route

  if (requiredRole && requiredRole !== role) {
    // Si l'utilisateur n'a pas le rôle requis, rediriger vers une page d'accès interdit ou autre page
    router.navigate(['/']);
    return false;
  }

  return true;
};
