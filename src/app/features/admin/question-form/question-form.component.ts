import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-question-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent implements OnInit {
  form!: FormGroup;

  partId?: string;
  questionId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      content: ['', Validators.required],
      questionOrder: [1, Validators.required],
      audioUrl: [''],
      imageUrl: [''],
    });

    this.partId = this.route.snapshot.paramMap.get('partId') || undefined;

    this.questionId = this.route.snapshot.paramMap.get('id') || undefined;

    if (this.questionId) {
      this.loadQuestion();
    }
  }

  loadQuestion() {
    this.testService.getQuestionById(this.questionId!).subscribe((res: any) => {
      this.form.patchValue(res);
    });
  }

  save() {
    const payload = {
      ...this.form.value,
      testPartId: this.partId,
    };

    if (this.questionId) {
      this.testService
        .updateQuestion(this.questionId, payload)
        .subscribe(() => {
          this.goBack();
        });
    } else {
      this.testService.createQuestion(payload).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/parts', this.partId, 'questions']);
  }
}
