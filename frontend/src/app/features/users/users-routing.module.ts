import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPage } from './pages/users/users.page';
import { AuthGuard } from '../../core/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: UsersPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
