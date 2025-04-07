import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPage } from './pages/users.page';

const routes: Routes = [{ path: '', component: UserPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
