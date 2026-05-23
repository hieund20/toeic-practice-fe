import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupFormComponent } from './question-group-form.component';

describe('QuestionGroupFormComponent', () => {
  let component: QuestionGroupFormComponent;
  let fixture: ComponentFixture<QuestionGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
