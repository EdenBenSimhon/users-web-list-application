import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = 'http://localhost:3000/user/login';
  private tokenKey = 'auth_token';

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  login(
    username: string | null | undefined,
    password: string | null | undefined
  ): Observable<boolean> {
    const loginPayload = { username, password };

    return this._http.post<any>(this._apiUrl, loginPayload).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        return [false];
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
