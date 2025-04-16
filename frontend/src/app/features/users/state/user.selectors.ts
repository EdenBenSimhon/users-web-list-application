import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UsersState } from './users.reducer';
import { User } from './user.model';

export const selectUserState =
  createFeatureSelector<UsersState>(usersFeatureKey);

export const usersSelectors = (page: number) =>
  createSelector(selectUserState, (state) => {
    const baseUsers: User[] = state.usersByPage[page] || [];

    const mergedUsers: User[] = baseUsers.map((user) =>
      state.updatedUsers[user.id]
        ? { ...user, ...state.updatedUsers[user.id] }
        : user
    );

    const filteredUsers = mergedUsers.filter(
      user => !state.deletedUsers.has(user.id)
    );

    const createdForPage = state.createdUsers.filter(
      user => user.page === page
    );

    return [...filteredUsers, ...createdForPage];
  });
