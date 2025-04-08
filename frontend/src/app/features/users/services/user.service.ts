import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../state/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:3000/api'; // Base URL to backend API

  constructor(private http: HttpClient) {}

  // Fetch a paginated list of users
  getUsers(page: number): Observable<User[]> {
    const url = `${this.apiUrl}/getUsers/${page}`;
    return this.http.get<User[]>(url);
  }

  // Fetch user details by ID
  getUserById(id: string): Observable<User> {
    const url = `${this.apiUrl}/getUser/${id}`;
    return this.http.get<User>(url).pipe();
  }

  // Create a new user
  createUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/createUser`;
    return this.http.post<User>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Update user details by ID
  updateUser(id: string, user: User): Observable<User> {
    const url = `${this.apiUrl}/updateUser/${id}`;
    return this.http.put<User>(url, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Delete user by ID
  deleteUser(id: string): Observable<void> {
    const url = `${this.apiUrl}/deleteUser/${id}`;
    return this.http.delete<void>(url);
  }
}
