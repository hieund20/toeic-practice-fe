import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-test-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css',
})
export class TestListComponent implements OnInit {
  tests: any[] = [];
  pageIndex = 0;
  pageSize = 6;
  readonly pageSizeOptions = [6, 12, 24];

  constructor(
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.testService.getAllTests().subscribe((res) => {
      this.tests = res;
      this.pageIndex = 0;
    });
  }

  get paginatedTests(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.tests.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  startTest(id: string) {
    this.router.navigate(['/tests', id]);
  }
}
