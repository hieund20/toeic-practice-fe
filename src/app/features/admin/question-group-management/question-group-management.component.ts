import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionGroupService } from '../../../services/question-group.service';

@Component({
  selector: 'app-question-group-management',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    BreadcrumbComponent,
  ],
  templateUrl: './question-group-management.component.html',
  styleUrl: './question-group-management.component.css',
})
export class QuestionGroupManagementComponent implements OnInit {
  groups: any[] = [];

  displayedColumns = ['title', 'actions'];

  testId!: string;
  partId!: string;

  breadcrumbs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionGroupService: QuestionGroupService,
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId')!;

    this.partId = this.route.snapshot.paramMap.get('partId')!;

    this.buildBreadcrumbs();

    this.loadGroups();
  }

  loadGroups(): void {
    this.questionGroupService
      .getQuestionGroupsByPart(this.partId)
      .subscribe((res: any) => {
        this.groups = res;
      });
  }

  createGroup(): void {
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'groups',
      'create',
    ]);
  }

  editGroup(groupId: string): void {
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'groups',
      groupId,
      'edit',
    ]);
  }

  manageQuestions(groupId: string): void {
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'groups',
      groupId,
      'questions',
    ]);
  }

  deleteGroup(groupId: string): void {
    const confirmed = window.confirm('Delete this group?');

    if (!confirmed) {
      return;
    }

    this.questionGroupService.deleteQuestionGroup(groupId).subscribe(() => {
      this.loadGroups();
    });
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
        label: 'Manage Parts',
        link: `/admin/tests/${this.testId}/parts`,
      },
      {
        label: 'Question Groups',
      },
    ];
  }
}
