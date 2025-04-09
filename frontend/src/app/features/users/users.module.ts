import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPage } from './pages/users/users.page';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserService } from './services/user.service';
import { usersReducer } from './state/users.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserModal } from './modal/user.modal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [UserCardComponent, UsersPage, HeaderComponent, UserModal],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatDialogModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    ScrollingModule,
    StoreModule.forFeature('user', usersReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserService, AuthGuard],
})
export class UsersModule {}
