import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  FailedAction,
  GetUsersAction,
  GetUsersSuccessAction,
  UsersActionTypes,
} from './users.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({ providedIn: 'root' })
export class UsersEffects {
  constructor(
    private readonly _actions$: Actions,
    private readonly _userService: UserService
  ) {}

  //   fetchUsers$ = createEffect(() =>
  //     this._actions$.pipe(
  //       ofType<GetUsersAction>(UsersActionTypes.GetUsersAction),
  //       switchMap(() =>
  //         this._userService.getUsers(2).pipe(
  //           map(
  //             (users) => new GetUsersSuccessAction({ users }),
  //             catchError((error) => of(new FailedAction({ error })))
  //           )
  //         )
  //       )
  //     )
  //   );
}
