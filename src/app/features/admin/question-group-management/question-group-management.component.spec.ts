import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupManagementComponent } from './question-group-management.component';

describe('QuestionGroupManagementComponent', () => {
  let component: QuestionGroupManagementComponent;
  let fixture: ComponentFixture<QuestionGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
