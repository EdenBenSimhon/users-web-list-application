import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number) {
    return this.http.get<User[]>(`/getUsers/${page}`);
  }

  getUser(id: string) {
    return this.http.get<User>(`/getUser/${id}`);
  }

  createUser(user: User) {
    return this.http.post(`/createUser`, user);
  }

  updateUser(id: string, user: User) {
    return this.http.put(`/updateUser/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`/deleteUser/${id}`);
  }
}
