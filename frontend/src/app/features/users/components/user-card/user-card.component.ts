import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../state/user.model';
import { Store } from '@ngrx/store';
import { DeleteUserAction, UpdateUserAction } from '../../state/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { UserModal } from '../../modal/user.modal';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user!: User;

  constructor(
    private readonly _store: Store,
    private readonly _matDialog: MatDialog
  ) {}

  updateUser(id: string, user: User) {
    const dialogRef = this._matDialog.open(UserModal, {
      width: '30rem',
      data: { id, user },
    });
    dialogRef.afterClosed().subscribe((data: { name: string; job: string }) => {
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
}
