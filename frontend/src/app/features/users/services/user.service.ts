import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    console.log(page);
    return this.http.get<any>(url).pipe(map((response) => response.users));
  }

  // Fetch user details by ID
  getUserById(id: string): Observable<User> {
    // const url = `${this.apiUrl}/getUser/${id}`;
    // return this.http.get<User>(url).pipe();
    return of({
      id,
      name: 'fetch',
      job: 'fetch',
      email: 'fetch',
      first_name: 'fetch',
      last_name: 'fetch',
    });
  }

  // Create a new user
  createUser(name: string, job: string): Observable<User> {
    const url = `${this.apiUrl}/createUser`;
    // return this.http.post<User>(url, {name,job}, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // });

    return of({
      id: '100',
      name,
      job,
      email: 'fetch',
      first_name: 'fetch',
      last_name: 'fetch',
    });
  }

  // Update user details by ID
  updateUser(id: string, user: Partial<User>): Observable<User> {
    // const url = `${this.apiUrl}/updateUser/${id}`;
    // return this.http.put<User>(url, user, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // });

    return of({
      id,
      name: 'updated',
      job: 'updated',
      email: 'fetch',
      first_name: 'fetch',
      last_name: 'fetch',
    });
  }

  // Delete user by ID
  deleteUser(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/deleteUser/${id}`;
    this.http.delete<void>(url);
    return of(true);
  }
}
