import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-test-detail-management',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './test-detail-management.component.html',
  styleUrl: './test-detail-management.component.css',
})
export class TestDetailManagementComponent implements OnInit {
  test: any;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.testService.getTest(id).subscribe((res) => {
      this.test = res;
    });
  }

  manageQuestions(part: any) {
    console.log(part);
    this.router.navigate(['/admin/parts', part.id, 'questions']);
  }
}
