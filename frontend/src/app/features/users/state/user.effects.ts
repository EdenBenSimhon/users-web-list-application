import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  AddUserAction,
  AddUserSuccessAction,
  DeleteUserAction,
  DeleteUserSuccessAction,
  FailedAction,
  GetUsersAction,
  GetUsersSuccessAction,
  UpdateUserAction,
  UpdateUserSuccessAction,
  UsersActionTypes,
} from './users.actions';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _userService: UserService
  ) {}

  readonly fetchUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType<GetUsersAction>(UsersActionTypes.GetUsersAction),
      switchMap(({ payload }) =>
        this._userService.getUsers(payload.page).pipe(
          map((users) => new GetUsersSuccessAction({ users,page:payload.page })),
          catchError((error) => of(new FailedAction({ error })))
        )
      )
    )
  );

  readonly addUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType<AddUserAction>(UsersActionTypes.AddUserAction),
      switchMap(({ payload }) =>
        this._userService.createUser(payload.first_name, payload.job).pipe(
          map((user) => new AddUserSuccessAction({ user,page:payload.page })),
          catchError((error) => of(new FailedAction({ error })))
        )
      )
    )
  );

  readonly deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType<DeleteUserAction>(UsersActionTypes.DeleteUserAction),
      switchMap(({ payload }) =>
        this._userService.deleteUser(payload.id).pipe(
          map(() => new DeleteUserSuccessAction({ id: payload.id })),
          catchError((error) => of(new FailedAction({ error })))
        )
      )
    )
  );

  readonly updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType<UpdateUserAction>(UsersActionTypes.UpdateUserAction),
      switchMap(({ payload }) =>
        this._userService
          .updateUser(payload.id, payload.first_name, payload.job)
          .pipe(
            map(() => new UpdateUserSuccessAction({
                  id: payload.id,
                  first_name: payload.first_name,
                  job: payload.job,
                })
            ),
            catchError((error) => of(new FailedAction({ error })))
          )
      )
    )
  );
}
