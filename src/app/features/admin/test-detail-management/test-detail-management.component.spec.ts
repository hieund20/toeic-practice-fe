import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailManagementComponent } from './test-detail-management.component';

describe('TestDetailManagementComponent', () => {
  let component: TestDetailManagementComponent;
  let fixture: ComponentFixture<TestDetailManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDetailManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
