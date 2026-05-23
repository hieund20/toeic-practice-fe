import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-test-detail-management',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    BreadcrumbComponent,
    MatIcon,
  ],
  templateUrl: './test-detail-management.component.html',
  styleUrl: './test-detail-management.component.css',
})
export class TestDetailManagementComponent implements OnInit {
  test: any;

  breadcrumbs = [
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
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
  ) {}

  ngOnInit() {
    const testId = this.route.snapshot.paramMap.get('testId')!;

    this.testService.getTest(testId).subscribe((res) => {
      this.test = res;
    });
  }

  manageQuestions(part: any) {
    const groupedParts = [3, 4, 6, 7];

    if (groupedParts.includes(part.partNumber)) {
      this.router.navigate([
        '/admin/tests',
        this.test.id,
        'parts',
        part.id,
        'groups',
      ]);
    } else {
      this.router.navigate([
        '/admin/tests',
        this.test.id,
        'parts',
        part.id,
        'questions',
      ]);
    }
  }

  createPart() {
    this.router.navigate(['/admin/tests', this.test.id, 'parts', 'create']);
  }
}
