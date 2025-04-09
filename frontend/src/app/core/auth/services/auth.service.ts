import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = environment.apiUrl + 'user/login';

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.tokenKey);
    return !!token;
  }

  login(
    username: string | null | undefined,
    password: string | null | undefined
  ): Observable<boolean> {
    const loginPayload = { username, password };

    return this._http.post<{ token: string }>(this._apiUrl, loginPayload).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem(environment.tokenKey, response.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(environment.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(environment.tokenKey);
    this._router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }
}
