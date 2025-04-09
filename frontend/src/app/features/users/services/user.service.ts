import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    return this.http.post<Partial<User>>(url, { name, job }).pipe(
      map((response: Partial<User>) => {
        const [first_name, last_name] = name ? name.split(' ') : ['', ''];
        return {
          id: response.id || '',
          email: 'user@created.com',
          first_name,
          last_name,
          job: response.job,
          avatar: 'url://default-avatar.png',
        };
      })
    );
  }

  // Update user details by ID
  updateUser(
    id: string,
    name: string,
    job: string
  ): Observable<{ id: string; name: string; job: string }> {
    const url = `${this.apiUrl}/updateUser/${id}`;
    return this.http
      .put<{ name: string; job: string }>(url, { name, job })
      .pipe(
        map((response: { name: string; job: string }) => {
          return {
            id,
            name: response.name,
            job: response.job,
          };
        })
      );
  }

  // Delete user by ID
  deleteUser(id: string): Observable<void> {
    const url = `${this.apiUrl}/deleteUser/${id}`;

    return this.http.delete<void>(url);
  }
}
