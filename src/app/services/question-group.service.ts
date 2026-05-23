import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionGroupService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getQuestionGroupsByPart(partId: string) {
    return this.http.get(`${this.baseUrl}/question-groups/part/${partId}`);
  }

  deleteQuestionGroup(groupId: string) {
    return this.http.delete(`${this.baseUrl}/question-groups/${groupId}`);
  }

  createQuestionGroup(payload: any) {
    return this.http.post(`${this.baseUrl}/question-groups`, payload);
  }

  updateQuestionGroup(groupId: string, payload: any) {
    return this.http.put(`${this.baseUrl}/question-groups/${groupId}`, payload);
  }

  getQuestionGroupById(groupId: string) {
    return this.http.get(`${this.baseUrl}/question-groups/${groupId}`);
  }
}
