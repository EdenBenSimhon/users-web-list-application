import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserPage } from './pages/users.page';

@NgModule({
  declarations: [UserPage],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
