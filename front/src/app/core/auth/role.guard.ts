import { CanActivateFn } from '@angular/router';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => (_route, state) => {
  const role = localStorage.getItem('role');
  return Boolean(role && allowedRoles.includes(role)) || state.url === '/login';
};