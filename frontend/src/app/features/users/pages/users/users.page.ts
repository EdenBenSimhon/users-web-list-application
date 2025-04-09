import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddUserAction,
  DeleteUserAction,
  GetUsersAction,
  UpdateUserAction,
} from '../../state/users.actions';
import { usersSelectors } from '../../state/user.selectors';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModal } from '../../modal/user.modal';
import { User } from '../../state/user.model';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  shareReplay,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {
  currentPage$ = new BehaviorSubject<number>(1);
  usersPagination$ = this.currentPage$.pipe(
    distinctUntilChanged(),
    tap((page) => this._store.dispatch(new GetUsersAction({ page }))),
    shareReplay(1)
  );
  constructor(
    private readonly _store: Store,
    private readonly _authSerivce: AuthService,
    private readonly _matDialog: MatDialog
  ) {
    this.usersPagination$.subscribe();
  }

  readonly users$ = this._store.select(usersSelectors);

  addUser() {
    const dialogRef = this._matDialog.open(UserModal, {
      width: '30rem',
      data: {},
    });
    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this._store.dispatch(
          new AddUserAction({ name: user.name, job: user.job })
        );
      }
    });
  }

  deleteUser(id: string) {
    this._store.dispatch(new DeleteUserAction({ id }));
  }

  changePage(step: number) {
    const current = this.currentPage$.value;
    const nextPage = current + step;

    if (nextPage > 0) {
      this.currentPage$.next(nextPage);
    }
  }

  // getUsers() {
  //   this._store.dispatch(new GetUsersAction({}));
  // }

  virtualScroll() {}
}
