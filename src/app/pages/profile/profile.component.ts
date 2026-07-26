import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TestAttempt } from '../../models/test-attempt.model';
import { AuthService } from '../../services/auth.service';
import { TestAttemptService } from '../../services/test-attempt.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatTabsModule, MatTableModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['test', 'score', 'submittedAt'];

  historyList: TestAttempt[] = [];

  user = {
    name: '',
    email: '',
    role: '',
  };

  constructor(
    private authService: AuthService,
    private testAttemptService: TestAttemptService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadHistory();
    this.loadUser();
  }

  loadHistory(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      return;
    }

    this.testAttemptService.getHistoryByUser(userId).subscribe({
      next: (response) => {
        this.historyList = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  loadUser(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      return;
    }

    this.userService.getUserById(userId).subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
