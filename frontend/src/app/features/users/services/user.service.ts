import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../state/user.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + 'api';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    const url = `${this.apiUrl}/getUsers/${page}`;
    return this.http.get<any>(url).pipe(map((response) => response.users));
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.apiUrl}/getUser/${id}`;
    return this.http.get<any>(url).pipe(map((response) => response.user));
  }

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

  deleteUser(id: string): Observable<void> {
    const url = `${this.apiUrl}/deleteUser/${id}`;

    return this.http.delete<void>(url);
  }
}
