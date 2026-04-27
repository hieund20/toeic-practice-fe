import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-test-management',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './test-management.component.html',
  styleUrl: './test-management.component.css',
})
export class TestManagementComponent implements OnInit {
  tests: any[] = [];

  displayedColumns = ['title', 'actions'];

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

  editTest(id: string) {
    this.router.navigate(['/admin/tests/edit', id]);
  }

  deleteTest(id: string) {
    this.testService.deleteTest(id).subscribe(() => {
      this.loadTests();
    });
  }

  manageTest(id: string) {
    this.router.navigate(['/admin/tests', id, 'manage']);
  }
}
