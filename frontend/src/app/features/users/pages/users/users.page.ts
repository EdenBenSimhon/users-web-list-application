import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUsersAction } from '../../state/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
})
export class UsersPage {
  constructor(private readonly _store: Store) {}
}
