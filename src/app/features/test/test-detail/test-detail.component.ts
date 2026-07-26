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
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { OnDestroy } from '@angular/core';

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
    MatIconModule,
  ],
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
})
export class TestDetailComponent implements OnInit, OnDestroy {
  test: any;
  selectedAnswers: any = {};
  flatQuestions: any[] = [];
  currentIndex = 0;
  timeLeft = 120 * 60; // 120 minutes
  partNavigators: any[] = [];

  timer: any;
  formattedTime = '02:00:00';
  isSubmitting = false;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
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

      this.buildPartNavigator();
    });

    this.startTimer();
  }

  selectAnswer(qId: string, aId: string) {
    this.selectedAnswers[qId] = aId;
  }

  submit() {
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

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
      clearInterval(this.timer);
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
    this.updateFormattedTime();

    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        this.updateFormattedTime();
      } else {
        clearInterval(this.timer);

        if (!this.isSubmitting) {
          this.submit();
        }
      }
    }, 1000);
  }

  buildPartNavigator(): void {
    let globalIndex = 0;

    this.partNavigators = this.test.parts.map((part: any) => {
      const items: any[] = [];

      // normal questions
      part.questions.forEach((q: any) => {
        items.push({
          questionId: q.id,
          displayNumber: globalIndex + 1,
          index: globalIndex,
        });

        globalIndex++;
      });

      // grouped questions
      part.groups.forEach((g: any) => {
        g.questions.forEach((q: any) => {
          items.push({
            questionId: q.id,
            displayNumber: globalIndex + 1,
            index: globalIndex,
          });

          globalIndex++;
        });
      });

      return {
        partNumber: part.partNumber,
        items,
      };
    });
  }

  updateFormattedTime(): void {
    const hours = Math.floor(this.timeLeft / 3600);

    const minutes = Math.floor((this.timeLeft % 3600) / 60);

    const seconds = this.timeLeft % 60;

    this.formattedTime =
      `${this.pad(hours)}:` + `${this.pad(minutes)}:` + `${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
