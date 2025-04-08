import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPage } from './pages/users/users.page';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { usersReducer } from './state/users.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/user.effects';

@NgModule({
  declarations: [UserCardComponent, UsersPage],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forFeature('user', usersReducer), // Configure the feature store for 'user'
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UserService],
})
export class UsersModule {}
