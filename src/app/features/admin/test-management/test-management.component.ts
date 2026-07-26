import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-test-management',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    BreadcrumbComponent,
  ],
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css'],
})
export class TestManagementComponent implements OnInit {
  tests: any[] = [];

  displayedColumns = ['title', 'actions'];

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
    },
  ];

  constructor(
    private testService: TestService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.testService.getAllTests().subscribe((res) => {
      this.tests = res;
    });
  }

  createTest() {
    this.router.navigate(['/admin/tests/create']);
  }

  editTest(testId: string) {
    this.router.navigate(['/admin/tests', testId, 'edit']);
  }

  deleteTest(id: string) {
    this.testService.deleteTest(id).subscribe(() => {
      this.loadTests();
    });
  }

  manageTest(testId: string) {
    this.router.navigate(['/admin/tests', testId, 'parts']);
  }
}
