import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUserById(userId: string) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
}
