import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-question-management',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './question-management.component.html',
  styleUrl: './question-management.component.css',
})
export class QuestionManagementComponent implements OnInit {
  questions: any[] = [];
  partId!: string;

  displayedColumns = ['content', 'order', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.partId = this.route.snapshot.paramMap.get('partId')!;
    this.loadQuestions();
  }

  loadQuestions() {
    this.testService.getQuestionsByPart(this.partId).subscribe((res: any[]) => {
      this.questions = res;
    });
  }

  deleteQuestion(id: string) {
    const confirmed = window.confirm('Delete this question?');

    if (!confirmed) return;

    this.testService.deleteQuestion(id).subscribe(() => {
      this.loadQuestions();
    });
  }

  createQuestion() {
    this.router.navigate(['/admin/parts', this.partId, 'questions', 'create']);
  }

  editQuestion(id: string) {
    this.router.navigate(['/admin/questions', id, 'edit']);
  }

  manageAnswers(questionId: string) {
    this.router.navigate(['/admin/questions', questionId, 'answers']);
  }
}
