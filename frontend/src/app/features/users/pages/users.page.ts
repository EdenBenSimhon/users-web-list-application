import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrl: './users.page.scss',
})
export class UserPage {
  constructor() {
    console.log('UserPage constructor');
  }
}
