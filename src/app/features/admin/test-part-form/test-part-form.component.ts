import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-test-part-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './test-part-form.component.html',
  styleUrl: './test-part-form.component.css',
})
export class TestPartFormComponent implements OnInit {
  form!: FormGroup;

  testId?: string;
  partId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      partNumber: [
        '',
        [Validators.required, Validators.min(1), Validators.max(7)],
      ],
    });

    this.testId = this.route.snapshot.paramMap.get('testId') || undefined;

    this.partId = this.route.snapshot.paramMap.get('id') || undefined;

    if (this.partId) {
      this.loadPart();
    }
  }

  loadPart() {
    this.testService.getPartById(this.partId!).subscribe((res: any) => {
      this.testId = res.testId;
      this.form.patchValue({
        partNumber: res.partNumber,
      });
    });
  }

  save() {
    const payload = {
      testId: this.testId,
      partNumber: this.form.value.partNumber,
    };

    if (this.partId) {
      this.testService.updatePart(this.partId, payload).subscribe(() => {
        this.goBack();
      });
    } else {
      this.testService.createPart(payload).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack() {
    if (!this.testId) return;

    this.router.navigate(['/admin/tests', this.testId, 'manage']);
  }
}
