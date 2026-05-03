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

  createTest(payload: any) {
    return this.http.post(`${this.baseUrl}/tests`, payload);
  }

  updateTest(id: string, payload: any) {
    return this.http.put(`${this.baseUrl}/tests/${id}`, payload);
  }

  deleteTest(id: string) {
    return this.http.delete(`${this.baseUrl}/tests/${id}`);
  }

  getQuestionsByPart(partId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/questions/part/${partId}`);
  }

  deleteQuestion(id: string) {
    return this.http.delete(`${this.baseUrl}/questions/${id}`);
  }

  createQuestion(payload: any) {
    return this.http.post(`${this.baseUrl}/questions`, payload);
  }

  getQuestionById(id: string) {
    return this.http.get(`${this.baseUrl}/questions/${id}`);
  }

  updateQuestion(id: string, payload: any) {
    return this.http.put(`${this.baseUrl}/questions/${id}`, payload);
  }

  getAnswersByQuestion(questionId: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/answers/question/${questionId}`,
    );
  }

  createAnswer(payload: any) {
    return this.http.post(`${this.baseUrl}/answers`, payload);
  }

  getAnswerById(id: string) {
    return this.http.get(`${this.baseUrl}/answers/${id}`);
  }

  updateAnswer(id: string, payload: any) {
    return this.http.put(`${this.baseUrl}/answers/${id}`, payload);
  }

  deleteAnswer(id: string) {
    return this.http.delete(`${this.baseUrl}/answers/${id}`);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}/upload/image`, formData);
  }

  uploadAudio(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}/upload/audio`, formData);
  }

  createPart(payload: any) {
    return this.http.post(`${this.baseUrl}/test-parts`, payload);
  }

  getPartById(id: string) {
    return this.http.get(`${this.baseUrl}/test-parts/${id}`);
  }

  updatePart(id: string, payload: any) {
    return this.http.put(`${this.baseUrl}/test-parts/${id}`, payload);
  }
}
