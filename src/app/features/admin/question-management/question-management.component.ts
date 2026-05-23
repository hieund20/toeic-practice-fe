import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-question-management',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    BreadcrumbComponent,
  ],
  templateUrl: './question-management.component.html',
  styleUrl: './question-management.component.css',
})
export class QuestionManagementComponent implements OnInit {
  questions: any[] = [];
  partId!: string;

  displayedColumns = ['content', 'order', 'actions'];

  breadcrumbs: any[] = [];
  testId!: string;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.testId = this.route.snapshot.paramMap.get('testId')!;
    this.partId = this.route.snapshot.paramMap.get('partId')!;

    this.buildBreadcrumbs();
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
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'questions',
      'create',
    ]);
  }

  editQuestion(questionId: string) {
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'questions',
      questionId,
      'edit',
    ]);
  }

  manageAnswers(questionId: string) {
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'questions',
      questionId,
      'answers',
    ]);
  }

  buildBreadcrumbs(): void {
    this.breadcrumbs = [
      {
        label: 'Home',
        link: '/tests',
      },
      {
        label: 'Admin',
        link: '/admin/tests',
      },
      {
        label: 'Manage Tests',
        link: '/admin/tests',
      },
      {
        label: 'Manage Parts',
        link: `/admin/tests/${this.testId}/parts`,
      },
      {
        label: 'Manage Questions',
      },
    ];
  }
}
