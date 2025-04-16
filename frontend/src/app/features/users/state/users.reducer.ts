import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UsersActions, UsersActionTypes } from './users.actions';
import { User } from './user.model';

export const usersFeatureKey = 'user';

export interface UsersState {
  usersByPage: { [page: number]: User[] };
  createdUsers: (User & { page: number })[];
  updatedUsers: { [id: string]: Partial<User> };
  deletedUsers: Set<string>;
  loading: boolean;
  error: Error | null;
}
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = {
  usersByPage: {},
  createdUsers: [],
  updatedUsers: {},
  deletedUsers: new Set(),
  loading: false,
  error: null,
};

export function usersReducer(
  state: UsersState = initialState,
  action: UsersActions
): UsersState {
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
        usersByPage: {
          ...state.usersByPage,
          [action.payload.page]: action.payload.users.filter(
            (user) => !state.deletedUsers.has(user.id)
          ),
        },
        loading: false,
        error: null,
      };

    case UsersActionTypes.UpdateUserSuccessAction:
      const { id, first_name, job } = action.payload;
      const updatedCreatedUsers = state.createdUsers.map(user =>
        user.id === id ? { ...user, first_name, job } : user
      );
      return {
        ...state,
        createdUsers: updatedCreatedUsers,
        updatedUsers: {
          ...state.updatedUsers,
          [id]: { ...state.updatedUsers[id], first_name, job } as Partial<User>,
        },
        loading: false,
        error: null,
      };

    case UsersActionTypes.AddUserSuccessAction:
      return {
        ...state,
        createdUsers: [
          ...state.createdUsers,
          {
            ...action.payload.user, 
            page: action.payload.page 
          }
        ],
        loading: false,
        error: null,
      };

    case UsersActionTypes.DeleteUserSuccessAction:
      return {
        ...state,
        deletedUsers: new Set(state.deletedUsers).add(action.payload.id),
        createdUsers : state.createdUsers.filter(user => user.id != action.payload.id) ,
        updatedUsers: Object.fromEntries(
          Object.entries(state.updatedUsers).filter(([key]) => key != action.payload.id)
        ),
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
