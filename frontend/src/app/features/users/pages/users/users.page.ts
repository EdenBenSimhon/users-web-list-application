import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddUserAction,
  DeleteUserAction,
  GetUsersAction,
} from '../../state/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { UserModal } from '../../modal/user.modal';
import {
  BehaviorSubject,
  distinctUntilChanged,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { usersSelectors } from '../../state/user.selectors';

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


   readonly users$ = this.currentPage$.pipe(
    distinctUntilChanged(),
    switchMap((page) => this._store.select(usersSelectors(page))),
    takeUntil(this._destroy$)
  );
 
  
  constructor(
    private readonly _store: Store,
    private readonly _matDialog: MatDialog,
    private readonly _cd:ChangeDetectorRef
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
          const currentPage = this.currentPage$.getValue();
          this._store.dispatch(
            new AddUserAction({ first_name: user.name, job: user.job ,page:currentPage })
          );
        }
      });
  }

  deleteUser(id: string) {
    this._store.dispatch(new DeleteUserAction({ id }));
    this._cd.detectChanges()
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
