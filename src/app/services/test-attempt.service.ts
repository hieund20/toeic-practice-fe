import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestAttempt } from '../models/test-attempt.model';

@Injectable({
  providedIn: 'root',
})
export class TestAttemptService {
  private baseUrl = 'http://localhost:8080/api/test-attempts';

  constructor(private http: HttpClient) {}

  getHistoryByUser(userId: string): Observable<TestAttempt[]> {
    return this.http.get<TestAttempt[]>(`${this.baseUrl}/user/${userId}`);
  }
}
