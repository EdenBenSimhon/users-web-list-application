import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../state/user.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) {}

  // Fetch a paginated list of users
  getUsers(page: number): Observable<User[]> {
    const url = `${this.apiUrl}/getUsers/${page}`;
    const users: User[] = [];

    for (let i = 0; i < 10; i++) {
      users.push({ id: i + '', name: 'fetch' + i, job: 'fetch' + i });
    }
    return of(users);
    // return this.http.get<User[]>(url);
  }

  // Fetch user details by ID
  getUserById(id: string): Observable<User> {
    // const url = `${this.apiUrl}/getUser/${id}`;
    // return this.http.get<User>(url).pipe();
    return of({ id, name: 'fetch', job: 'fetch' });
  }

  // Create a new user
  createUser(name: string, job: string): Observable<User> {
    const url = `${this.apiUrl}/createUser`;
    // return this.http.post<User>(url, {name,job}, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // });

    return of({ id: '100', name: 'created', job: 'created' });
  }

  // Update user details by ID
  updateUser(id: string, user: Partial<User>): Observable<User> {
    // const url = `${this.apiUrl}/updateUser/${id}`;
    // return this.http.put<User>(url, user, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // });

    return of({ id, name: 'updated', job: 'updated' });
  }

  // Delete user by ID
  deleteUser(id: string): Observable<void> {
    // const url = `${this.apiUrl}/deleteUser/${id}`;
    // return this.http.delete<void>(url);
    return of(undefined);
  }
}
