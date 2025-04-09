import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPage } from './pages/users/users.page';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { usersReducer } from './state/users.reducer';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { MatCard, MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserCardComponent, UsersPage, HeaderComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    MatCardModule,
    StoreModule.forFeature('user', usersReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserService, AuthGuard],
})
export class UsersModule {}
