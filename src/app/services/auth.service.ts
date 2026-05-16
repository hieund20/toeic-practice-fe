import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(payload: any) {
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(payload: any) {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }

  saveAuth(token: string, role: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  isAdmin() {
    return this.getRole() === 'ADMIN';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
}
