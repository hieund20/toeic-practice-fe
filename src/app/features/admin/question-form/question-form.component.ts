import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent implements OnInit {
  form!: FormGroup;

  partId?: string;
  questionId?: string;
  groupId?: string;
  testId?: string;

  isUploadingImage = false;
  isUploadingAudio = false;

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
      groupId: ['']
    });

    this.partId = this.route.snapshot.paramMap.get('partId') || undefined;
    this.questionId =
      this.route.snapshot.paramMap.get('questionId') || undefined;
    this.groupId = this.route.snapshot.paramMap.get('groupId') || undefined;
    this.testId = this.route.snapshot.paramMap.get('testId') || undefined;

    if (this.questionId) {
      this.loadQuestion();
    }
  }

  loadQuestion() {
    this.testService.getQuestionById(this.questionId!).subscribe((res: any) => {
      this.partId = res.testPartId;
      this.form.patchValue(res);
    });
  }

  save() {
    const payload = {
      ...this.form.value,
      testPartId: this.partId,
      groupId: this.groupId
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
    if (!this.testId || !this.partId) {
      return;
    }

    // grouped question
    if (this.groupId) {
      this.router.navigate([
        '/admin/tests',
        this.testId,
        'parts',
        this.partId,
        'groups',
        this.groupId,
        'questions',
      ]);

      return;
    }

    // standalone question
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'questions',
    ]);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    this.isUploadingImage = true;

    this.testService.uploadImage(file).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          imageUrl: res.url,
        });
      },
      complete: () => {
        this.isUploadingImage = false;
      },
    });
  }

  uploadAudio(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    this.isUploadingAudio = true;

    this.testService.uploadAudio(file).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          audioUrl: res.url,
        });
      },
      complete: () => {
        this.isUploadingAudio = false;
      },
    });
  }
}
