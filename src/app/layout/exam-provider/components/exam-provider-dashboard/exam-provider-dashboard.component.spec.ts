import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProviderDashboardComponent } from './exam-provider-dashboard.component';

describe('ExamProviderDashboardComponent', () => {
  let component: ExamProviderDashboardComponent;
  let fixture: ComponentFixture<ExamProviderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamProviderDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamProviderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
