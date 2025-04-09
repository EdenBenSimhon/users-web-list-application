import {
  createActionGroup,
  emptyProps,
  props,
  Action,
  ActionsSubject,
  createAction,
} from '@ngrx/store';
import { User } from './user.model';

export enum UsersActionTypes {
  GetUsersAction = '[Users] Get Users',
  GetUsersSuccessAction = '[Users] Get Users Success',
  UpdateUserAction = '[Users] Update User',
  UpdateUserSuccessAction = '[Users] Update User Success',
  AddUserAction = '[Users] Add User',
  AddUserSuccessAction = '[Users] Add User Success',
  DeleteUserAction = '[Users] Delete User',
  DeleteUserSuccessAction = '[Users] Delete User Success',
  FailedAction = '[Users] Failed Action',
}

export class GetUsersAction implements Action {
  public readonly type = UsersActionTypes.GetUsersAction;
  constructor(public payload: { page: number }) {}
}
export class GetUsersSuccessAction implements Action {
  public readonly type = UsersActionTypes.GetUsersSuccessAction;
  constructor(public payload: { users: User[] }) {}
}

export class UpdateUserAction implements Action {
  public readonly type = UsersActionTypes.UpdateUserAction;
  constructor(public payload: { id: string; user: Partial<User> }) {}
}

export class UpdateUserSuccessAction implements Action {
  public readonly type = UsersActionTypes.UpdateUserSuccessAction;
  constructor(public payload: { user: User }) {}
}

export class AddUserAction implements Action {
  public readonly type = UsersActionTypes.AddUserAction;
  constructor(public payload: { name: string; job: string }) {}
}

export class AddUserSuccessAction implements Action {
  public readonly type = UsersActionTypes.AddUserSuccessAction;
  constructor(public payload: { user: User }) {}
}

export class FailedAction implements Action {
  public readonly type = UsersActionTypes.FailedAction;
  constructor(public payload: { error: Error }) {}
}

export class DeleteUserAction implements Action {
  public readonly type = UsersActionTypes.DeleteUserAction;
  constructor(public payload: { id: string }) {}
}

export class DeleteUserSuccessAction implements Action {
  public readonly type = UsersActionTypes.DeleteUserSuccessAction;
  constructor(public payload: { id: string }) {}
}

export type UsersActions =
  | GetUsersAction
  | UpdateUserAction
  | AddUserAction
  | DeleteUserAction
  | GetUsersSuccessAction
  | UpdateUserSuccessAction
  | AddUserSuccessAction
  | DeleteUserSuccessAction
  | FailedAction;
