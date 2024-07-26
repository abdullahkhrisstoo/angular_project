import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProviderComponent } from './exam-provider.component';

describe('ExamProviderComponent', () => {
  let component: ExamProviderComponent;
  let fixture: ComponentFixture<ExamProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
