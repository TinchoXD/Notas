import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.validateToken()) {
    return true; // Token válido, permite el acceso
  } else {
    router.navigate(['/iniciar-sesion']).then(() => {
      window.location.reload(); // Refresca la página después de la redirección
    });
    return false; // Token inválido o expirado, bloquea el acceso
  }
};
