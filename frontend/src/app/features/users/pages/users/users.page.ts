import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddUserAction,
  DeleteUserAction,
  GetUsersAction,
} from '../../state/users.actions';
import { usersSelectors } from '../../state/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { UserModal } from '../../modal/user.modal';
import {
  BehaviorSubject,
  distinctUntilChanged,
  shareReplay,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();
  currentPage$ = new BehaviorSubject<number>(1);
  usersPagination$ = this.currentPage$.pipe(
    distinctUntilChanged(),
    tap((page) => this._store.dispatch(new GetUsersAction({ page }))),
    shareReplay(1),
    takeUntil(this._destroy$)
  );
  readonly users$ = this._store.select(usersSelectors);
  constructor(
    private readonly _store: Store,
    private readonly _matDialog: MatDialog
  ) {
    this.usersPagination$.subscribe();
  }

  addUser() {
    const dialogRef = this._matDialog.open(UserModal, {});
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((user) => {
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

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
