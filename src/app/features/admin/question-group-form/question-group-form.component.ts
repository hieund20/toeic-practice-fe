import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionGroupService } from '../../../services/question-group.service';
import { TestService } from '../../../services/test.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-question-group-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BreadcrumbComponent,
  ],
  templateUrl: './question-group-form.component.html',
  styleUrl: './question-group-form.component.css',
})
export class QuestionGroupFormComponent implements OnInit {
  form!: FormGroup;

  groupId!: string | null;

  testId!: string;
  partId!: string;

  isUploadingAudio = false;
  isUploadingImage = false;

  breadcrumbs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionGroupService: QuestionGroupService,
    private testService: TestService,
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId')!;

    this.partId = this.route.snapshot.paramMap.get('partId')!;

    this.groupId = this.route.snapshot.paramMap.get('groupId');

    this.initForm();

    this.buildBreadcrumbs();

    if (this.groupId) {
      this.loadGroup();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      audioUrl: [''],
      imageUrl: [''],
    });
  }

  loadGroup(): void {
    this.questionGroupService
      .getQuestionGroupById(this.groupId!)
      .subscribe((res: any) => {
        this.form.patchValue(res);
      });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const payload = {
      ...this.form.value,
      testPartId: this.partId,
    };

    if (this.groupId) {
      this.questionGroupService
        .updateQuestionGroup(this.groupId, payload)
        .subscribe(() => {
          this.goBack();
        });
    } else {
      this.questionGroupService.createQuestionGroup(payload).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.router.navigate([
      '/admin/tests',
      this.testId,
      'parts',
      this.partId,
      'groups',
    ]);
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.isUploadingImage = true;

    this.testService.uploadImage(file).subscribe((url: string) => {
      this.form.patchValue({
        imageUrl: url,
      });

      this.isUploadingImage = false;
    });
  }

  uploadAudio(event: any): void {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.isUploadingAudio = true;

    this.testService.uploadAudio(file).subscribe((url: string) => {
      this.form.patchValue({
        audioUrl: url,
      });

      this.isUploadingAudio = false;
    });
  }

  buildBreadcrumbs(): void {
    this.breadcrumbs = [
      {
        label: 'Home',
        link: '/tests',
      },
      {
        label: 'Admin',
        link: '/admin/tests',
      },
      {
        label: 'Question Groups',
        link: `/admin/tests/${this.testId}/parts/${this.partId}/groups`,
      },
      {
        label: this.groupId ? 'Edit Group' : 'Create Group',
      },
    ];
  }
}
