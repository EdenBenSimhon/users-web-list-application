import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private readonly _apiUrl = environment.apiUrl + 'user/register';
  constructor(private readonly _http: HttpClient) {}

  register(
    username: string | null | undefined,
    password: string | null | undefined
  ): Observable<boolean> {
    const registerPayload = { username, password };
    return this._http.post<any>(this._apiUrl, registerPayload);
  }
}
