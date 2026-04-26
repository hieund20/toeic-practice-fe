import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-test-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css',
})
export class TestListComponent implements OnInit {
  tests: any[] = [];

  constructor(
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.testService.getAllTests().subscribe((res) => {
      this.tests = res;
    });
  }

  startTest(id: string) {
    this.router.navigate(['/tests', id]);
  }
}
