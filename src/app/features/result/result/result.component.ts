import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  result: any = history.state;

  constructor(private router: Router) {}

  goToReview() {
    if (!this.result?.attemptId) {
      console.error('Missing attemptId');
      return;
    }

    this.router.navigate(['/review', this.result.attemptId]);
  }
}
