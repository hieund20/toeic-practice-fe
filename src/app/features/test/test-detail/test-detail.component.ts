import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-detail',
  imports: [CommonModule],
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
    private router: Router
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
    const payload = {
      testId: this.test.id,
      userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
