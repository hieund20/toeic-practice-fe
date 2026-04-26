import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAllTests() {
    return this.http.get<any[]>(`${this.baseUrl}/tests`);
  }

  getTest(id: string) {
    return this.http.get(`${this.baseUrl}/tests/${id}`);
  }

  submit(data: any) {
    return this.http.post(`${this.baseUrl}/submit`, data);
  }

  getReview(attemptId: string) {
    return this.http.get(`${this.baseUrl}/attempts/${attemptId}/review`);
  }
}
