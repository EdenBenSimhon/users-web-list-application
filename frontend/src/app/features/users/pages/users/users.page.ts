import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddUserAction,
  DeleteUserAction,
  GetUsersAction,
  UpdateUserAction,
} from '../../state/users.actions';
import { usersSelectors } from '../../state/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage implements OnInit {
  constructor(
    private readonly _store: Store,
    private readonly cd: ChangeDetectorRef
  ) {}

  readonly users$ = this._store.select(usersSelectors);

  ngOnInit(): void {
    this._store.dispatch(new GetUsersAction());
  }

  addUser() {
    this._store.dispatch(
      new AddUserAction({ name: 'John Doe', job: 'Developer' })
    );
  }

  deleteUser(id: string) {
    this._store.dispatch(new DeleteUserAction({ id }));
  }

  updateUser(id: string) {
    console.log(id);
    this._store.dispatch(
      new UpdateUserAction({ id, user: { name: 's Doe', job: 'Developer' } })
    );
    this.cd.detectChanges();
  }

  getUsers() {
    this._store.dispatch(new GetUsersAction());
  }

  virtualScroll() {}
}
