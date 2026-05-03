import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPartFormComponent } from './test-part-form.component';

describe('TestPartFormComponent', () => {
  let component: TestPartFormComponent;
  let fixture: ComponentFixture<TestPartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPartFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
