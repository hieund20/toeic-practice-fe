import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-answer-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.css',
})
export class AnswerFormComponent implements OnInit {
  form!: FormGroup;

  questionId?: string;
  answerId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      content: ['', Validators.required],
      isCorrect: [false],
      answerOrder: [1, Validators.required],
    });

    this.questionId =
      this.route.snapshot.paramMap.get('questionId') || undefined;

    this.answerId = this.route.snapshot.paramMap.get('id') || undefined;

    if (this.answerId) {
      this.loadAnswer();
    }
  }

  loadAnswer() {
    this.testService.getAnswerById(this.answerId!).subscribe((res: any) => {
      this.questionId = res.questionId;
      this.form.patchValue(res);
    });
  }

  save() {
    const payload = {
      ...this.form.value,
      questionId: this.questionId,
    };

    if (this.answerId) {
      this.testService.updateAnswer(this.answerId, payload).subscribe(() => {
        this.goBack();
      });
    } else {
      this.testService.createAnswer(payload).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack() {
    if (!this.questionId) return;

    this.router.navigate(['/admin/questions', this.questionId, 'answers']);
  }
}
