import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-review',
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  data: any;

  constructor(private route: ActivatedRoute, private service: TestService) {}

  ngOnInit() {
    const attemptId = this.route.snapshot.paramMap.get('id')!;
    this.service.getReview(attemptId).subscribe((res) => {
      this.data = res;
    });
  }

  isCorrect(a: any) {
    return a.isCorrect;
  }

  isSelected(q: any, a: any) {
    return q.selectedAnswerId === a.id;
  }
}
