import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/user.module').then((m) => m.UserModule),
  },
];
