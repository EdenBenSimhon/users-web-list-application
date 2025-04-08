import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UsersActions, UsersActionTypes } from './users.actions';
import { User } from './user.model';

export const usersFeatureKey = 'user';

export interface UserState {
  users: User[];
  loading: boolean;
  error: Error | null;
}
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export function usersReducer(
  state: UserState = initialState,
  action: UsersActions
): UserState {
  switch (action.type) {
    case UsersActionTypes.GetUsersAction:
    case UsersActionTypes.UpdateUserAction:
    case UsersActionTypes.AddUserAction:
    case UsersActionTypes.DeleteUserAction:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UsersActionTypes.GetUsersSuccessAction:
      return {
        ...state,
        users: action.payload.users,
        loading: false,
        error: null,
      };

    case UsersActionTypes.UpdateUserSuccessAction:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.user.id ? action.payload.user : user
        ),

        loading: false,
        error: null,
      };

    case UsersActionTypes.AddUserSuccessAction:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        loading: false,
        error: null,
      };

    case UsersActionTypes.DeleteUserSuccessAction:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
        loading: false,
        error: null,
      };

    case UsersActionTypes.FailedAction:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
