import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UserState } from './users.reducer';

export const selectUserState =
  createFeatureSelector<UserState>(usersFeatureKey);

export const usersSelectors = createSelector(
  selectUserState,
  (state: UserState) => {
    return {
      users: state.users,
      loading: state.loading,
      error: state.error,
    };
  }
);
