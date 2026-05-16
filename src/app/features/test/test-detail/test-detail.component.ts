import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-test-detail',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  templateUrl: './test-detail.component.html',
  styleUrl: './test-detail.component.css',
})
export class TestDetailComponent implements OnInit {
  test: any;
  selectedAnswers: any = {};
  flatQuestions: any[] = [];
  currentIndex = 0;
  timeLeft = 120 * 60; // 120 minutes

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.testService.getTest(id).subscribe((res: any) => {
      this.test = res;

      // flatten questions
      this.flatQuestions = [];

      res.parts.forEach((part: any) => {
        part.questions.forEach((q: any) => {
          this.flatQuestions.push(q);
        });

        part.groups.forEach((g: any) => {
          g.questions.forEach((q: any) => {
            q.group = g;
            this.flatQuestions.push(q);
          });
        });
      });
    });

    this.startTimer();
  }

  selectAnswer(qId: string, aId: string) {
    this.selectedAnswers[qId] = aId;
  }

  submit() {
    const userId = this.authService.getUserId();

    const payload = {
      testId: this.test.id,
      userId: userId,
      answers: Object.keys(this.selectedAnswers).map((qId) => ({
        questionId: qId,
        selectedAnswerId: this.selectedAnswers[qId],
      })),
    };

    this.testService.submit(payload).subscribe((res: any) => {
      // navigate to result page
      this.router.navigate(['/result'], { state: res });
    });
  }

  get currentQuestion() {
    return this.flatQuestions[this.currentIndex];
  }

  get currentGroup() {
    return this.currentQuestion?.group || null;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submit();
      }
    }, 1000);
  }
}
