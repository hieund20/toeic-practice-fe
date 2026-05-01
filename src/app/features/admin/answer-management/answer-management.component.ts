import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-answer-management',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './answer-management.component.html',
  styleUrl: './answer-management.component.css',
})
export class AnswerManagementComponent implements OnInit {
  answers: any[] = [];
  questionId!: string;

  displayedColumns = ['content', 'correct', 'order', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.questionId = this.route.snapshot.paramMap.get('questionId')!;

    this.loadAnswers();
  }

  loadAnswers() {
    this.testService
      .getAnswersByQuestion(this.questionId)
      .subscribe((res: any[]) => {
        this.answers = res;
      });
  }

  createAnswer() {
    this.router.navigate([
      '/admin/questions',
      this.questionId,
      'answers',
      'create',
    ]);
  }

  editAnswer(id: string) {
    this.router.navigate(['/admin/answers', id, 'edit']);
  }

  deleteAnswer(id: string) {
    const confirmed = window.confirm('Delete this answer?');

    if (!confirmed) return;

    this.testService.deleteAnswer(id).subscribe(() => {
      this.loadAnswers();
    });
  }
}
