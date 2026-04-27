import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-test-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export class TestFormComponent implements OnInit {
  form!: FormGroup;

  testId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['']
    });

    this.testId = this.route.snapshot.paramMap.get('id') || undefined;

    if (this.testId) {
      this.testService.getTest(this.testId).subscribe((res: any) => {
        this.form.patchValue({
          title: res.title,
        });
      });
    }
  }

  save() {
    if (this.testId) {
      this.testService
        .updateTest(this.testId, this.form.value)
        .subscribe(() => {
          this.router.navigate(['/admin/tests']);
        });
    } else {
      this.testService.createTest(this.form.value).subscribe(() => {
        this.router.navigate(['/admin/tests']);
      });
    }
  }
}
