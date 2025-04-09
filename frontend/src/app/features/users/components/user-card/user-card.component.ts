import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { User } from '../../state/user.model';
import { Store } from '@ngrx/store';
import { DeleteUserAction, UpdateUserAction } from '../../state/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { UserModal } from '../../modal/user.modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent implements OnDestroy {
  @Input() user!: User;
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _store: Store,
    private readonly _matDialog: MatDialog,
    private readonly _snackBar: MatSnackBar,
    private readonly _userService: UserService
  ) {}

  updateUser(id: string, user: User) {
    const dialogRef = this._matDialog.open(UserModal, {
      data: { id, user },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: { name: string; job: string }) => {
        if (user) {
          this._store.dispatch(
            new UpdateUserAction({
              id,
              name: data.name,
              job: data.job,
            })
          );
        }
      });
  }

  deleteUser(id: string) {
    this._store.dispatch(new DeleteUserAction({ id }));
  }

  async getUserDetails(id: string) {
    const details = await firstValueFrom(this._userService.getUserById(id));
    this.showToast(details);
  }

  showToast(user: User): void {
    const toastMessage = `Full name: ${user.first_name} ${user.last_name},  email: ${user.email} , avatar:${user.avatar}`;
    this._snackBar.open(toastMessage, 'Close', {
      duration: 5000,
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
